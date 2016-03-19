var React = require('react');
var ReactDom = require('react-dom');
var FormGenerator = require('form-generator-react');

var Example = React.createClass({
  schema: {
    field: {
      type: Number,
      label: 'Number Field',
      validate: function(val) {
        if (val % 10 !== 0) {
          return 'Error: input must be divisible by 10';
        }
      }
    }
  },

  onSubmit: function(data) {
    console.log('Parsed form data', data);
    // Reset fields back to default values
    this.refs.myFormRef.reset();
  },

  render: function() {
    var schema = this.schema;
    var ref = 'myFormRef';
    var onSubmit = this.onSubmit;
    var formElement = FormGenerator.create(schema, ref, onSubmit);

    return <span>{formElement}</span>;
  }
});

$(document).ready(function() {
  var rootParent = document.getElementById('content');
  var rootNode = React.createElement(Example, {}, rootParent);
  ReactDom.render(rootNode, rootParent);
});
