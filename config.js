module.exports = { 
	template : 	[
		{
			type : 'string' ,
			htmltext : '<p>{{name}} {{type}}</p>' ,
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