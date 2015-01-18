sails-viewify
=============
[![npm](https://img.shields.io/npm/v/sails-viewify.svg?style=flat-square)](https://www.npmjs.com/package/sails-viewify)
[![npm](https://img.shields.io/npm/dm/sails-viewify.svg?style=flat-square)](https://www.npmjs.com/package/sails-viewify)
[![npm](https://img.shields.io/npm/l/sails-viewify.svg?style=flat-square)](https://github.com/scriptnull/sails-viewify/blob/master/License.md)
[![Gitter chat](https://badges.gitter.im/scriptnull/sails-viewify.png)](https://gitter.im/scriptnull/sails-viewify)

``sails-viewify`` is a tool for reusing your [sails models](http://sailsjs.org/#/documentation/reference/waterline/models) to build your [sails views](http://sailsjs.org/#/documentation/concepts/Views) rapidly.It is specifically suited for building web apps that often involve generating HTML forms.

>NOTE : sails-viewify is a helper module for the [sails](npmjs.com/package/sails) project.If you don't know what it is , first go ahead and see [sails](npmjs.com/package/sails).

##Install
Install sails-viewify from npm.

```bash
npm install -g sails-viewify
```

##Example 
Let us consider that you have a model called User.

```javascript 
module.exports = {

  attributes: {
  	fname : {
  		type : 'string' ,
  	} ,

  	lname : {
  		type : 'string' ,
  	} ,

  	salary : {
  		type : 'integer' ,
  	} 
  }

};

```
Your obvious need might be creating a view that collects/exhibits the data for the model. In this case , your view may look like

```html 
<form method="POST" action="/user/add"> 
	<!-- First Name -->
	<label for="fname" > First Name </label>
	<input type="text" name="fname" id="fname" />
	<!-- Last Name -->
	<label for="lname" > Last Name </label>
	<input type="text" name="lname" id="lname" />
	<!-- Salary -->
	<label for="salary" > Salary </label>
	<input type="number" name="salary" id="salary" />
</form>
```
In this case , you only have 3 fields , but think of a situation 
- where your model has about some 30 attributes. 
- where you use some more tags and CSS classes to follow a uniform design throughout your project

You may feel tired of copying and pasting a template of html ( in this case , a label and input tag ) repeatedly and modify its name,id and value attributes each time by refering to the attribute name in the model's file.

What if we write our model and try to generate these fields for us based on the type of the attribute. Yeah ! This is what sails-viewify does !

You could use frontend frameworks like [angular.js](https://angularjs.org) to do this.But there may be cases where you want to write the html code manually in order to keep a check on some minor details. ``sails-viewify`` serves this purpose.

##How To Use 
Create and navigate to your sails project. Go ahead and create your models and controllers.

```bash
sails new myproject 
cd myproject
sails generate model User
sails generate controller User 
```
Install sails-viewify globally.
```bash
npm install -g sails-viewify
```

Initialize sails-viewify in the sails project by executing the following command.
```bash
sails-viewify init
```
This creates two files namely , 
- ``config/sails-viewify.js`` - Has the configuration details.
- ``viewify_input.txt`` - Refer ```sails-viewify escape```(extended use) for usage.
	
Next step is configuring your ``sails-viewify.js`` config file.
```javascript
module.exports = { 
	template : [
		{
			type : 'string' ,
			htmltext : '<p>type of {{name}} is {{type}}</p>',
			specials : [
				{
					text : '{{name}}' ,
					replacer : 'name'
				} ,
				{
					text : '{{type}}' ,
					replacer : 'type'
				}
			]
		} 
	]
}
```

- ``template`` - [array] specifies templates to be used for different types of attributes. Note that the type refers to the types used in the model and are available within [waterline](npmjs.com/package/waterline).
	- ``type`` - [string] specifies the type of the attributes used in the model.
	- ``htmltext`` - [string] specifies the html text to be generated for the respective attribute type.
	- ``specials`` - [array] specifies the special text in the ``htmltext`` field to be replaced by the respective replacer object value
		- ``text`` - [string] special text that is to be replaced by the values from the model.
		-  ``replacer`` - [string] replacer object points to the property of the attribute's object in the model. By default , sails-viewify creates name property which equals the name of the attribute in the model.Other than this , all the properties of the attribute are available.

That's it ! You are ready to generate your view . go ahead and execute 
```bash
sails-viewify modelname viewname
sails-viewify User UserDetails.ejs
```

Now , the view named UserDetails.ejs can be found in your views folder.
```html
<p>type of fname is string</p>
<p>type of lname is string</p>
<p>type of salary is integer</p>
```

#####Extended Use
Lets say , you want to add an id field to each p tag.Then your htmltext in ``config/sails-viewify.js`` would look like
```javascript
htmltext : "<p id="{{name}}">type of {{name}} is {{type}}</p>" //invalid 
```
The above seen snippet is invalid since the double quotation marks inside the html are not escaped.So the valid syntax would be 
```javascript
htmltext : "<p id=\"{{name}}\">type of {{name}} is {{type}}</p>" //valid 
```
``sails-viewify`` provides the utility to quickly generate your escaped html strings. It can be done as follows

Write the usual html snippet and copy paste in ``viewify_input.txt`` and run 
```bash
sails-viewify escape
```
The escaped string can be copied and pasted from ``viewify_output.txt``.

##Command List 
- sails-viewify 
- sails-viewify init
- sails-viewify escape

##Goals and Plans 
The main scope of viewify is to speed up the frontend development by reusing the models defined for the backend. However , it doesn't stop with that.

Future release plan includes ,
- standardizing the ``sails-viewify.js`` configuration file.
- User Interface for generating the configuration file and doing almost everything.
- Migrating towards GUI based environment for basic sails frontend development.
- Video Demo for using sails-viewify.

##Contribution
Contributions in any form are welcomed. Some of the areas that currently need help are documentation and writing tests.You are also welcomed to join this project for standardizing the already existing stuff and for implementing the plans mentioned above.

##License
``sails-viewify`` is licensed under [The MIT License](https://github.com/scriptnull/sails-viewify/blob/master/License.md)
