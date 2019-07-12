import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { closeModal, openModal } from '../actions/modalActions';

const actions = {
    closeModal
};

class UnAuthModal extends Component {
  render() {
    return (
      <Modal size="mini" open={true} onClose={this.props.closeModal}>
          <Modal.Header> You need to be signed in to do this! </Modal.Header>
          <Modal.Content>
              <Modal.Description>
                  <Button.Group width={4}>
                    <Button fluid positive onClick={() => openModal("LoginModal")}>Login</Button>
                    <Button.Or text="OR"/>
                    <Button fluid onClick={() => openModal("RegisterModal")}>Register</Button>
                  </Button.Group>
                  <Divider />
                  <div style={{ textAlign: 'center' }}>
                    <p>Or Click tcancel to continue as a guest</p>
                    <Button onClick={closeModal}>Cancel</Button>
                  </div>
              </Modal.Description>
             
          </Modal.Content>
      </Modal>
    )
  }
}

export default connect(null, actions)(UnAuthModal);