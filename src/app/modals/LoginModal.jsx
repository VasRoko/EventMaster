import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import LoginForm from '../auth/Login/LoginForm';
import { openModal, closeModal } from '../actions/modalActions';

const actions = {
    openModal,
    closeModal
}


class LoginModal extends Component {

    handlePasswordReset = () => {
       this.props.openModal('PasswordResetModal')
    }

    render() {
        return (
            <Modal size="mini" open={true} onClose={this.props.closeModal}>
                <Modal.Header> Login to EventMaster</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <LoginForm passwordReset={this.handlePasswordReset} />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        ) 
    }
}

export default connect(null, actions)(LoginModal);
