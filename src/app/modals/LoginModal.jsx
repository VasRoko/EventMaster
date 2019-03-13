import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import LoginForm from '../auth/Login/LoginForm';
import { closeModal } from '../actions/modalActions';

const actions = {
    closeModal
}

class LoginModal extends Component {
    render() {
        return (
            <Modal size="mini" open={true} onClose={this.props.closeModal}>
                <Modal.Header> Login to EventMaster</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        ) 
    }
}

export default connect(null, actions)(LoginModal);
