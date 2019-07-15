import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { closeModal, openModal } from '../actions/modalActions';
import { withRouter } from 'react-router-dom';

const actions = {
    openModal,
    closeModal
};

class UnAuthModal extends Component {

  handleCloseModal = () => {
    this.props.history.goBack();
    this.props.closeModal()
  }

  render() {
    const { openModal } = this.props;
    return (
      <Modal size="mini" open={true} onClose={this.handleCloseModal}>
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
                    <Button onClick={this.handleCloseModal}>Cancel</Button>
                  </div>
              </Modal.Description>
             
          </Modal.Content>
      </Modal>
    )
  }
}

export default withRouter(connect(null, actions)(UnAuthModal));