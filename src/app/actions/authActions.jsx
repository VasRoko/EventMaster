import { SubmissionError } from 'redux-form';
import { SIGN_OUT_USER } from '../auth/authConst';
import { toastr } from 'react-redux-toastr';
import { closeModal } from './modalActions';

export const Register = (user) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            await createdUser.user.updateProfile({
                dispalyName: user.nickname
            });

            let newUser = {
                displayName: user.nickname,
                createdAt: firestore.FieldValue.serverTimestamp()
            }

            await firestore.set(`users/${createdUser.user.uid}`, {...newUser});
            
            dispatch(closeModal());
        } catch(e) {
            toastr.error(e.message);
        }
    }
export const login = (credentials) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            toastr.success("Successfully logged in!");
            dispatch(closeModal());
        } catch(e) {
            throw new SubmissionError({
                _error: e.message
            })
        }
    }
}

export const logout = () => {
    return {
        type: SIGN_OUT_USER
    }
}