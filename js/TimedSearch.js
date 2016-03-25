var React = require('react');
var ReactDom = require('react-dom');
var FormGenerator = require('form-generator-react');

var Example = React.createClass({
  schema: {
    timeStarted: {
      type: Date,
      label: 'Time Started'
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
