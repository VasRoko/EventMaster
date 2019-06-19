import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { successNotification, errorNotification } from '../common/notifications/notification';
import cuid from 'cuid';

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
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = {
            name: imageName 
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
                name: imageName,
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

export const deletePhoto = (photo) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {

        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;

        try {
            dispatch(asyncActionStart());
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{ collection: 'photos', doc: photo.id }]
            })
            dispatch(asyncActionFinish());
        } catch(e) {
            throw new Error({
                _error: e.message
            })
        }
    }

export const setMainPhoto = photo => 
    async(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            return await firebase.updateProfile({
                photoURL: photo.url
            });
        } catch (e) {
            throw new Error({
                _error: e.message
            })
        }
    }

export const goingToEvent = (event) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        const userProfile = getState().firebase.profile;

        const attendee = {
            going: true,
            host: false,
            joinDate: firestore.FieldValue.serverTimestamp(),
            photoURL: userProfile.photoURL || '/assets/user.png',
            displayName: userProfile.displayName,
        }
        try {
            await firestore.update(`events/${event.id}`, {
                [`attendees.${user.id}`]: attendee
            });
            await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
                eventId: event.id,
                userUid: user.uid,
                eventDate: event.date,
                host: false
            });
            successNotification();
        } catch (e) {
            errorNotification();
            throw new Error({
                _error: e.message
            })
        }

    }