import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Icon } from 'semantic-ui-react'
import { closeModal } from '../actions/modalActions'

const actions = {
    closeModal 
}

const InfoModal = ({closeModal, header, message}) => {
  return (
    <Modal size="mini" open={true} onClose={closeModal}>
        <Modal.Header possitive>{ header || 'Info Modal' }</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <p>{ message || 'Info Message' }</p>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button positive icon='checkmark' labelPosition='right' content='Ok'onClick={closeModal} />
        </Modal.Actions>
    </Modal>
  )
}

export default connect(null, actions)(InfoModal);
