import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { successNotification, errorNotification } from '../common/notifications/notification';

export const updateProfile = (user) => 
    (dispatch, getState, {getFirebase}) => {
        
        const firebase = getFirebase();
        const { isLoaded, isEmpty, ...updatedUser } = user;

        try {
            firebase.updateProfile(updatedUser);
            successNotification('Success', 'You profile updated');
        } catch (e) {
            errorNotification();
            throw new Error({
                _error: e.message
            })
        }
    }

export const uploadAvatar = (file, fileName) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: fileName 
        }; 

        try {
            
            dispatch(asyncActionStart());
            // Uploading the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options);

            // get url of the image 
            let photoURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            
            // set photo as main if there are none
            let userDoc = await firestore.get(`users/${user.uid}`);


            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: photoURL
                });
                await user.updateProfile({
                    photoURL: photoURL
                });
            }

            // add image to firestore
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos'}]
            }, {
                name: fileName,
                url: photoURL
            });

            dispatch(asyncActionFinish())
        } catch (e) {
            dispatch(asyncActionError());
            throw new Error({
                _error: e.message
            })
        }
    }      