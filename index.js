#!/usr/bin/env node

//sails-viewify modelname viewname config.js
var fs = require('fs');
var path = require('path');
var str = '';
jsStringEscape = require('js-string-escape');

//init
if(process.argv[2].localeCompare("init") === 0 ){
	fs.exists('./.sailsrc', function(isSails){
		if(!isSails)
			throw new Error('not a sails project');
		fs.createReadStream(path.join( __dirname , 'config.js'))
			.pipe(fs.createWriteStream( path.join(process.cwd() , 'config/sails-viewify.js')));		
	  	fs.writeFileSync('viewify_input.txt' , '');
	});
}
//escape
else if(process.argv[2].localeCompare("escape") === 0 ){
	fs.exists('./.sailsrc', function(isSails){
		if(!isSails)
			throw new Error('not a sails project');
		fs.readFile('viewify_input.txt' , { encoding : 'utf8'} , function(err , data){
			var mystr = jsStringEscape(data);
			fs.writeFile('viewify_output.txt' , mystr , { encoding : 'utf8'} , function(err , data){
				if(err)
					throw err;
			})
		});
	});
}
else
{
	//other than init & escape 
	//check if init is done 
	fs.exists(path.join(process.cwd() , 'config/sails-viewify.js') , function(isInit){
		if(!isInit)
			new Error('sails-viewify not initialized.Try sails-viewify init');
		else
		{
			if( process.argv[2] === undefined )
				throw new Error('specify source filename');

			if(process.argv[3] === undefined )
				throw new Error('specify destination filename');

			if(process.argv[4] === undefined)
				var config = require(path.join(process.cwd() , 'config/sails-viewify.js'));
			else
				var config = require('./' + process.argv[4]);

			//dependent requires 
			var model = require(path.join(process.cwd() , 'api' , 'models', process.argv[2] + '.js' ) );
			var attributes = model.attributes ;
			var template = config.template;
			var destFile = path.join('views' , process.argv[3]);

			var render = function (htmltext , objName , obj,  template ) {
				var specials = template.specials ;
				for(var i = 0 ; i < specials.length ; i++ ){
					var specialObj = specials[i];
					if(specialObj.replacer.localeCompare("name") === 0 ){
						//htmltext = htmltext.replace(specialObj.text, objName);
						htmltext = htmltext.split(specialObj.text).join(objName);
					}
					else if ( obj[specialObj.replacer] !== undefined ){
						//htmltext = htmltext.replace(specialObj.text,obj[specialObj.replacer]);
						htmltext = htmltext.split(specialObj.text).join(obj[specialObj.replacer]);
					}
				}
				return htmltext;
			}

			for(var obj in attributes){
				var type = attributes[obj].type ;	
				for( var index in template ){
					var t = template[index];
					if(type.localeCompare(t.type) === 0 ){
						var temp =  render(t.htmltext , obj , attributes[obj] , t )
						str = str.concat(temp + '\n');
						fs.writeFileSync( destFile , str );
					}
				}
			}
		}
	});
}