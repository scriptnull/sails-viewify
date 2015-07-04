// Example config
// 
// module.exports = { 
//   template: [
//     {
//       type: 'text',
//       htmltext: '<p>type of {{name}} is {{type}}</p>',
//       specials: [
//         {
//           text: '{{name}}',
//           replacer: 'name'
//         },
//         {
//           text: '{{type}}',
//           replacer: 'type'
//         }
//       ]
//     } 
//   ]
// };

module.exports = {

  template : [
    {
      type : 'text' ,
      htmltext : 
        '<div>\n' +
        '    <label for="{{name}}">{{name}}: </label>\n' +
        '    <input id="{{name}}" type="{{type}}" />\n' +
        '</div>\n',
      specials : [
        {
          text : '{{name}}' ,
          replacer : 'name'
        },
        {
          text : '{{type}}' ,
          replacer : 'type'
        }
      ]
    }
  ]

};