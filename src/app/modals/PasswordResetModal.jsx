import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import PasswordRestForm from '../auth/PasswordReset/PasswordRestForm';
import { closeModal } from '../actions/modalActions';

const actions = {
    closeModal
}

class PasswordResetModal extends Component {
    render() {
        return (
            <Modal size="mini" open={true} onClose={this.props.closeModal}>
                <Modal.Header> Password Reset</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <PasswordRestForm />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        ) 
    }
}

export default connect(null, actions)(PasswordResetModal);
