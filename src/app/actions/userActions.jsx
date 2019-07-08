import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { successNotification, errorNotification } from '../common/notifications/notification';
import firebase from '../config/firebase';
import { FETCH_EVENTS } from '../../const';

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
    async(dispatch, getState) => {
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        const today = new Date();

        let userDoc = firestore.collection('users').doc(user.uid);
        let eventAttedneeRef = firestore.collection('event_attendee');

        try {
            dispatch(asyncActionStart());
            let batch = firestore.batch();

            batch.update(userDoc, {
                photoURL: photo.url
            });

            let eventQuery = await eventAttedneeRef.where('userUid', '==',  user.uid).where('eventDate', '>=', today);
            let eventQuerySnap = await eventQuery.get();

            for ( let i = 0; i < eventQuerySnap.docs.length; i++ ) {
                let eventDocRef = await firestore.collection('events').doc(eventQuerySnap.docs[i].data().eventId)
                let event = await eventDocRef.get();

                if (event.data().hostUid === user.uid) {
                    batch.update(eventDocRef, {
                        hostPhotoUrl: photo.url,
                        [`attendees.${user.uid}.photoURL`]: photo.url
                    }) 
                } else {
                    batch.update(eventDocRef, {
                        [`attendees.${user.uid}.photoURL`]: photo.url
                    }) 
                }
            }
            
            await batch.commit();
            dispatch(asyncActionFinish());

        } catch (e) {
            console.log(e.message)
            dispatch(asyncActionError());
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

        console.log(event.id);
        debugger;

        try {
            await firestore.update(`events/${event.id}`, {
                [`attendees.${user.uid}`]: attendee
            });
            await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
                eventId: event.id,
                userUid: user.uid,
                eventDate: event.date,
                host: false
            });
            successNotification();
        } catch (e) {
            console.log(e.message)
            errorNotification();
            throw new Error({
                _error: e.message
            })
        }

    }

    export const cancleGoingToEvent = (event) => 
        async (dispatch, getState, {getFirestore, getFirebase}) => {
            const firebase = getFirebase();
            const firestore = getFirestore();

            const user = firebase.auth().currentUser;
            try {
                await firestore.update(`events/${event.id}`, {
                    [`attendees.${user.uid}`]: firestore.FieldValue.delete()
                })
                await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
                successNotification();
            } catch (e) {
                errorNotification();
                throw new Error({
                    _error: e.message
                })
            }
        }
 
export const getUserEvents = (userUid, activeTab) => 
    async (dispatch, getState) => {
        dispatch(asyncActionStart());
        const firestore = firebase.firestore();
        const today = new Date();
        let eventsRef = firestore.collection('event_attendee');
        let query;

        switch(activeTab) {
            case 1: 
                query = eventsRef
                    .where('userUid', '==', userUid)
                    .where('eventDate', '<=', today)
                    .orderBy('eventDate', 'desc');
                break;
            case 2: 
                query = eventsRef
                    .where('userUid', '==', userUid)
                    .where('eventDate', '>=', today)
                    .orderBy('eventDate');
                break;
            case 3: 
                query = eventsRef
                    .where('userUid', '==', userUid)
                    .where('host', '==', true)
                    .orderBy('eventDate', 'desc');
                    break;
            default: 
                query = eventsRef
                    .where('userUid', '==', userUid)
                    .orderBy('eventDate', 'desc');
                break;
        }

        try {
            let querySnap = await query.get();
            let events = [];

            for (let i = 0; i < querySnap.docs.length; i++) {
                let event = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
                events.push({ ...event.data(), id: event.id })
            }
            dispatch({type: FETCH_EVENTS, payload: {events}});
            dispatch(asyncActionFinish());
        } catch(e) {
            dispatch(asyncActionError());
            console.log(e.message)
        }
    }