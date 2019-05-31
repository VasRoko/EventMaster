import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import { closeModal } from '../actions/modalActions'

const actions = {
    closeModal 
}

const TestModal = ({closeModal}) => {
  return (
    <Modal open={true} onClose={closeModal}>
        <Modal.Header>Test Modal</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <p>Test modal...</p>
            </Modal.Description>
        </Modal.Content>
    </Modal>
  )
}

export default connect(null, actions)(TestModal);
