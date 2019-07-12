import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { successNotification, errorNotification } from '../common/notifications/notification';
import firebase from '../config/firebase';
import { FETCH_EVENTS } from '../../const';

import cuid from 'cuid';

export const updateProfile = (user) => 
    async (dispatch, getState) => {
        
        const { isLoaded, isEmpty, ...updatedUser } = user;        
        const firestore = firebase.firestore();
        const currentUser = firebase.auth().currentUser;
        const today = new Date();

        try {
            if (currentUser.displayName !== updatedUser.displayName ) {
                let userDoc = firestore.collection('users').doc(currentUser.uid);
                let eventAttedneeRef = firestore.collection('event_attendee');
                
                dispatch(asyncActionStart());
                let batch = firestore.batch();
                batch.update(userDoc, updatedUser);
                await firebase.auth().currentUser.updateProfile(updatedUser);
    
                let eventsQuery = await eventAttedneeRef.where('userUid', '==',  currentUser.uid).where('eventDate', '>=', today);
                let eventsQuerySnap = await eventsQuery.get();
    
                for ( let i = 0; i < eventsQuerySnap.docs.length; i++ ) {
                    let eventDocRef = await firestore.collection('events').doc(eventsQuerySnap.docs[i].data().eventId)
                    let event = await eventDocRef.get();
    
                    if (event.data().hostUid === currentUser.uid) {
                        batch.update(eventDocRef, {
                            hostedBy: updatedUser.displayName,
                            [`attendees.${currentUser.uid}.displayName`]: updatedUser.displayName
                        }) 
                    } else {
                        batch.update(eventDocRef, {
                            [`attendees.${currentUser.uid}.displayName`]: updatedUser.displayName
                        }) 
                    }
                }
                await batch.commit();
            } else {
                firebase.updateProfile(updatedUser);
            }

            successNotification('Success', 'Your profile updated');
            dispatch(asyncActionFinish());
        } catch (e) {
            errorNotification();
            dispatch(asyncActionError());
            throw new Error(e.message)
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
            throw new Error(e.message)
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
            throw new Error(e.message)
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
            throw new Error(e.message)
        }
    }

export const goingToEvent = (event) => 
    async (dispatch, getState) => {
        dispatch(asyncActionStart());
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        const userProfile = getState().firebase.profile;

        const attendee = {
            going: true,
            host: false,
            joinDate: new Date(),
            photoURL: userProfile.photoURL || '/assets/user.png',
            displayName: userProfile.displayName,
        }

        try {
            let eventDoc = firestore.collection('events').doc(event.id);
            let eventAttendeeDoc = firestore.collection('event_attendee').doc(`${event.id}_${user.uid}`);

            await firestore.runTransaction(async(transaction) => {
                await transaction.get(eventDoc);
                await transaction.update(eventDoc, {
                    [`attendees.${user.uid}`]: attendee
                })
                await transaction.set(eventAttendeeDoc, {
                    eventId: event.id,
                    userUid: user.uid,
                    eventDate: event.date,
                    host: false
                })
            })
            
            const eventObj = await eventDoc.get();
            dispatch(asyncActionFinish());
            successNotification();
            return {
                id: eventObj.id,
                ...eventObj.data()
            }; 

        } catch (e) {
            dispatch(asyncActionError());
            errorNotification();
            throw new Error(e.message)
        }

    }

    export const cancleGoingToEvent = (event) => 
        async (dispatch, getState, {getFirebase, getFirestore} ) => {
            if(event === null || event === undefined) {
                throw new Error('Event object must be provided');
            } else {
                
            const firebase = getFirebase();
            const firestore = getFirestore();
            const user = firebase.auth().currentUser;
            try {
                dispatch(asyncActionStart());
                await firestore.update(`events/${event.id}`, {
                    [`attendees.${user.uid}`]: firestore.FieldValue.delete()
                })
                await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
                const eventObj = await firestore.collection('events').doc(event.id).get();
                dispatch(asyncActionFinish());
                successNotification();
                return {
                    id: eventObj.id,
                    ...eventObj.data()
                }; 
            } catch (e) {
                dispatch(asyncActionError());
                errorNotification();
                throw new Error(e.message)
            }
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