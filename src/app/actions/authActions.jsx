import { SIGN_OUT_USER } from '../auth/authConst';
import { toastr } from 'react-redux-toastr';
import { closeModal } from './modalActions'

export const login = (credentials) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            toastr.success("You have successfully logged in!");
            dispatch(closeModal());
        } catch(e) {
            toastr.error(e.message);
        }
    }
}

export const logout = () => {
    return {
        type: SIGN_OUT_USER
    }
}