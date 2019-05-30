import { SubmissionError } from 'redux-form';
// import { SIGN_OUT_USER } from '../auth/authConst';
import { toastr } from 'react-redux-toastr';
import { closeModal } from './modalActions';

export const Register = (user) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            
            if (createdUser) {
                await createdUser.user.updateProfile({
                    displayName: user.displayName
                });
            }

            let newUser = {
                displayName: user.displayName,
                createdAt: firestore.FieldValue.serverTimestamp()
            }
            
            await firestore.set(`users/${createdUser.user.uid}`, {...newUser});
            dispatch(closeModal());

        } catch(e) {
            toastr.error('Oops!', 'Something went wrong');
            throw new SubmissionError({
                _error: e.message
            })
        }
    }

export const login = (credentials) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
            toastr.success('Welcome!', 'You have successfully logged in!');
            dispatch(closeModal());
        } catch(e) {
            toastr.error('Oops!', 'Something went wrong');
            throw new Error({
                _error: e.message
            })
        }
    }
}

export const socialLogin = (selectedProvider) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        dispatch(closeModal());
        let user = await firebase.login({
            provider: selectedProvider,
            type: 'popup'
        });

        if (user.additionalUserInfo.isNewUser) {
            
            await firestore.set(`users/${user.user.uid}`, {
                displayName: user.profile.displayName,
                photoUrl: user.profile.avatarUrl,
                createdAt: firestore.FieldValue.serverTimestamp()
            });
        } 

        toastr.success('Welcome!', 'You have successfully logged in!');

    } catch(e) {
        toastr.error('Oops!', 'Something went wrong');
        throw new Error({
            _error: e.message
        })
    }
}

export const logout = () =>  {

}