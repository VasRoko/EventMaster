import { MODAl_CLOSE, MODAl_OPEN } from '../../const';

export const openModal = (modalType, modalProps) => {
    return {
        type: MODAl_OPEN,
        payload: {
            modalType,
            modalProps
        }
    }
}

export const closeModal = () => {
    return {
        type: MODAl_CLOSE
    }
}