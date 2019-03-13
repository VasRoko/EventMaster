import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import RegisterForm from '../auth/Register/RegisterForm';
import { closeModal } from '../actions/modalActions';

const actions = {
    closeModal
};

class RegisterModal extends Component {
  render() {
    return (
      <Modal size="mini" open={true} onClose={this.props.closeModal}>
          <Modal.Header> Register to EventMaster</Modal.Header>
          <Modal.Content>
              <Modal.Description>
                  <RegisterForm/>
              </Modal.Description>
          </Modal.Content>
      </Modal>
    )
  }
}

export default connect(null, actions)(RegisterModal);