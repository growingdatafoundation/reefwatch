import React from 'react'
import { Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap'

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
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={"ControlLabel"} sm={"2"}>
                    Date
                </Col>
                <Col sm={"10"}>
                    <FormControl type="email" placeholder="Date" />
                </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={"ControlLabel"} sm={"2"}>
                    Location
                </Col>
                <Col sm={"10"}>
                    <FormControl type="email" placeholder="Location" />
                </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={"ControlLabel"} sm={"2"}>
                    Team Leader
                </Col>
                <Col sm={"10"}>
                    <FormControl type="email" placeholder="Team Leader" />
                </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={"ControlLabel"} sm={"2"}>
                    Tide
                </Col>
                <Col sm={"10"}>
                    <FormControl type="email" placeholder="Tide" />
                </Col>
                </FormGroup>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" onClick={this.add}>Add</Button>
                <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
  }
})

module.exports = fieldDay;