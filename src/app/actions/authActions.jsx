import { SubmissionError, reset } from 'redux-form';
import { openModal, closeModal } from './modalActions';
import { errorNotification, successNotification } from '../common/notifications/notification';

export const Register = (user) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            
            if (createdUser) {
                createdUser.user.sendEmailVerification();
                firebase.logout();
                await createdUser.user.updateProfile({
                    displayName: user.displayName
                });
            }

            let newUser = {
                displayName: user.displayName,
                createdAt: firestore.FieldValue.serverTimestamp()
            }
            
            await firestore.set(`users/${createdUser.user.uid}`, {...newUser});
            dispatch(openModal('InfoModal', {
                header: 'Check Your Email',
                message: 'Please check and verify your Email address.',
            }));

        } catch(e) {
            
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
            if(!firebase.auth().currentUser.emailVerified) {
                firebase.logout();
                dispatch(openModal('InfoModal', {
                    header: 'Check Your Email',
                    message: 'You have not verified your email! Please check and verify your email address.',
                }));

                throw new Error({
                    message: 'Email is not verified!'
                }); 

            } else {
                successNotification('Welcome!', 'You have successfully logged in!');
                dispatch(closeModal());
            }
        } catch(e) {
            errorNotification();
            throw new SubmissionError({
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

        successNotification('Welcome!', 'You have successfully logged in!');

    } catch(e) {
        errorNotification();
        throw new SubmissionError({
            _error: e.message
        })
    }
}

export const updatePassword = (data) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        
        try {
            await user.updatePassword(data.newPassword1);
            dispatch(reset('account'));
            successNotification('Success!', 'Your password has been changed!');
        } catch (e) {
            errorNotification();
            throw new SubmissionError({
                _error: e.message
            })
        }
    }

export const updateEmail = (data) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        
        try {
            await user.updateEmail(data.email);
            successNotification('Success!', 'Your email has been changed!');
        } catch (e) {
            errorNotification();
            throw new SubmissionError({
                _error: e.message
            })
        }
}

export const resetPassword = (credential) => 
async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();        
    try {
        await firebase.auth().sendPasswordResetEmail(credential.email);
        successNotification('Success!', 'Please check your email');
            dispatch(openModal('InfoModal', {
                header: 'Check Your Email',
                message: 'We’ve sent you an email with a link to finish resetting your password.',
            }));
    } catch (e) {
        errorNotification();
        throw new SubmissionError({
            _error: e.message
        })
    }
}