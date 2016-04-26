var React = require('react');
var FormGenerator = require('form-generator-react');

export default React.createClass({
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
