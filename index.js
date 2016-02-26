#!/usr/bin/env node
 //sails-viewify modelname viewname config.js

var fs = require('fs');
var path = require('path');
var str = '';
jsStringEscape = require('js-string-escape');

// Init
if (process.argv[2].localeCompare("init") === 0) {
    fs.exists('./.sailsrc', function(isSails) {
        if (!isSails)
            throw new Error('not a sails project');
        fs.createReadStream(path.join(__dirname, 'config.js'))
            .pipe(fs.createWriteStream(path.join(process.cwd(), 'config/sails-viewify.js')));
        fs.writeFileSync('viewify_input.txt', '');
    });
}

// Escape
else if (process.argv[2].localeCompare("escape") === 0) {
    fs.exists('./.sailsrc', function(isSails) {
        if (!isSails)
            throw new Error('not a sails project');
        fs.readFile('viewify_input.txt', { encoding: 'utf8' }, function(err, data) {
            var mystr = jsStringEscape(data);
            fs.writeFile('viewify_output.txt', mystr, { encoding: 'utf8' }, function(err, data) {
                if (err)
                    throw err;
            });
        });
    });
} else {
    // Other than init & escape 
    // Check if init is done 
    fs.exists(path.join(process.cwd(), 'config/sails-viewify.js'), function(isInit) {
        if (!isInit)
            new Error('sails-viewify not initialized. Try sails-viewify init');
        else {
            if (process.argv[2] === undefined)
                throw new Error('Specify source filename');

            if (process.argv[3] === undefined)
                throw new Error('Specify destination filename');

            var config;
            if (process.argv[4] === undefined)
                config = require(path.join(process.cwd(), 'config/sails-viewify.js'));
            else
                config = require('./' + process.argv[4]);

            // Dependent requires 
            var model = require(path.join(process.cwd(), 'api', 'models', process.argv[2] + '.js'));
            var attributes = model.attributes;
            var template = config.template;
            var destFile = path.join('views', process.argv[3]);

            var render = function(htmltext, objName, obj, template) {
                var specials = template.specials;

                for (var i = 0; i < specials.length; i++) {
                    var specialObj = specials[i];

                    if (specialObj.replacer.localeCompare("name") === 0) {
                        htmltext = htmltext.split(specialObj.text).join(objName);
                    } else if (obj[specialObj.replacer] !== undefined) {
                        htmltext = htmltext.split(specialObj.text).join(obj[specialObj.replacer]);
                    }
                }
                return htmltext;
            };



            //          Loop on the Model properties and render it
            var renderModel = function(attributes, template) {
                var type;
                var collection;
                var t;
                var temp;
                var obj;
                var index;
                for (obj in attributes) {
                    type = attributes[obj].type;
                    collection = attributes[obj].collection;
                    for (index in template) {
                        t = template[index];
                        // If model has model or collection instead of type , then type === undefined , so 
                        if (type !== undefined) {
                            if (type.localeCompare(t.type) === 0) {
                                temp = render(t.htmltext, obj, attributes[obj], t)
                                str = str.concat(temp + '\n');
                                fs.writeFileSync(destFile, str);
                            }
                        }

                        // If model has a collection and the template is defined
                        if (collection !== undefined) {
                            if (collection.localeCompare(t.collection) === 0) {
                                var collectionModel;
                                var collectionAttributes
                                    //1) Write begin of the collection
                                if (t.beginhtmltext !== undefined) {
                                    temp = render(t.beginhtmltext, obj, attributes[obj], t)
                                    str = str.concat(temp + '\n');
                                    fs.writeFileSync(destFile, str);
                                }
                                //Get the collection model to render 
                                collectionModel = require(path.join(process.cwd(), 'api', 'models', t.collection + '.js'));
                                collectionAttributes = collectionModel.attributes;
                                //2) Write the collection
                                renderModel(collectionAttributes, template);
                                //3) Write begin of the collection
                                if (t.endhtmltext !== undefined) {
                                    temp = render(t.endhtmltext, obj, attributes[obj], t)
                                    str = str.concat(temp + '\n');
                                    fs.writeFileSync(destFile, str);
                                }
                            }
                        }

                    }
                }
            }

            renderModel(attributes, template);
        }
    });
}
