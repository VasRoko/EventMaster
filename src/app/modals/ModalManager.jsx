import React from 'react';
import { connect } from 'react-redux';
import LoginModal from '../modals/LoginModal';
import InfoModal from '../modals/InfoModal';
import RegisterModal from '../modals/RegisterModal';
import PasswordResetModal from './PasswordResetModal';

const modalLookup = {
    InfoModal,
    LoginModal,
    RegisterModal,
    PasswordResetModal,
}

const mapState = (state) => ({
    currentModal: state.modals
})

const ModalManager = ({currentModal}) => {
    let renderedModal;
    
    if (currentModal) {
        const {modalType, modalProps} = currentModal;
        const ModalComponent = modalLookup[modalType];

        renderedModal = <ModalComponent {...modalProps} />
    }
    return <span>{renderedModal}</span>
}

export default connect(mapState)(ModalManager)
