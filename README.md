sails-viewify
=============
Convert your sails models into views.

##Install
Install sails-viewify from npm.

```bash
npm install -g sails-viewify
```
##Purpose
sails-viewify is a tool for reusing your [sails models](http://sailsjs.org/#/documentation/reference/waterline/models) for building your views rapidly.

sails-viewify is specifically suited for building web apps that often involve generating HTML forms.

##Example 
Let us consider that you have model called User.

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

##Command List 
- sails-viewify 
- sails-viewify init
- sails-viewify escape
