import { MODAl_CLOSE, MODAl_OPEN } from '../modals/modalConstants';
import { createReducer } from '../common/util/reducerUtil';

const initialState = null;

export const openModal = (state, payload) => {
    const {modalType, modalProps} = payload;
    return {modalType,  modalProps}
}

export const closeModal = (state, payload) => {
    return null;
}

export default createReducer(initialState, {
    [MODAl_OPEN]: openModal,
    [MODAl_CLOSE]: closeModal
})