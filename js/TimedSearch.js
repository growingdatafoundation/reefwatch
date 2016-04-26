var React = require('react');
var FormGenerator = require('./form-generator.js');

export default React.createClass({
  schema: {
    timeStarted: {
      type: String,
      label: 'Time Started'
    }
  },

  onSubmit: function(data) {
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
