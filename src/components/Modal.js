import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    console.log(e.target)
    console.log(this.state.activeItem)

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Add/edit User </ModalHeader>
        {this.activeItem}
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title">Name</Label>
              <Input
                type="text"
                id="todo-title"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter user name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Age</Label>
              <Input
                type="text"
                id="todo-description"
                name="age"
                value={this.state.activeItem.age}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>

            <FormGroup>
              <Label for="todo-description">Gender</Label>
              <Input
                type="text"
                id="todo-description"
                name="gender"
                value={this.state.activeItem.gender}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CustomModal