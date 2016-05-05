import React from 'react'
import { Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap'
import FormGenerator from 'form-generator-react'

var FieldDaySchema = React.createClass({
    schema: {
        tideLowHeight: {
            type: String,
            label: 'Height of low tide (m)',
            isRequired: true
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
        alert({formElement});
        return <span>{formElement}</span>;
    }
});

var fieldDay =  React.createClass({
  getInitialState() {
    return { showModal: false };
  },
  close() {
    this.setState({ showModal: false });
  },
  open() {
    this.setState({ showModal: true });
  },
  add() {
      alert("Add Code Here")
  },
  render() {
    return (
        <Modal show={this.state.showModal} onHide={this.close} bsSize="large">
            <Modal.Header>
                <Modal.Title>Field Day</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FieldDaySchema />
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" onClick={this.add}>Add</Button>
                <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
  }
})

export default  fieldDay;