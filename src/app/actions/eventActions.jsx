import { DELETE_EVENT, FETCH_EVENTS } from '../../const';
import { createNewEvent } from '../common/util/helpers';
import { successNotification, errorNotification } from '../common/notifications/notification';
import firebase from '../config/firebase';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';

export const createEvent = (event) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;

        const photoURL = getState().firebase.profile.photoURL;
        const newEvent = createNewEvent(user, photoURL, event);
        
        try {
            let createdEvent = await firestore.add('events', newEvent);
            await firestore.set(`event_attendee/${createdEvent.id}_${user.id}`, {
                eventId: createdEvent.id,
                userUid: user.uid,
                eventDate: event.date,
                host: true,
            }) 
            successNotification('Success!', 'You have created a new event!');
            return createdEvent;
        
        } catch (e) {
            throw new Error({
                _error: e.message
            })
        }
    }

export const updateEvent = (event) =>
    async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        try {
            await firestore.update(`events/${event.id}`, event);
            successNotification('Success!', 'Your event has been updated!');
        } catch (e) {
            throw new Error({
                _error: e.message
            })
        }
    }
export const eventCancel = (cancelled, eventId) =>
    async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        try {
            await firestore.update(`events/${eventId}`, {
                cancelled: cancelled
            })
            successNotification('Success!', 'Your have cancelled you event!');
        } catch(e) {
            throw Error({
                _error: e.message
            })
        }
    }

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: {
            eventId
        }
    }
}

export const getEvents = (getAllEvents, lastEvent) => 
    async (dispatch, getState) => {
        // let today = new Date();
        const firestore = firebase.firestore();
        const eventsRef = firestore.collection('events');

        try {
            dispatch(asyncActionStart());
            let query;
            let startAfter = lastEvent && await firestore.collection('events').doc(lastEvent.id).get();            
            
            // if(!getAllEvents) {
            //     lastEvent ? 
            //         query = eventsRef.where('date', '>=', today ).orderBy('date').startAfter(startAfter).limit(2) : 
            //         query = eventsRef.where('date', '>=', today ).orderBy('date').limit(2)
            // } else {
                lastEvent ? 
                    query = eventsRef.orderBy('date').startAfter(startAfter).limit(3) : 
                    query = eventsRef.orderBy('date').limit(3)
            // }

            let querySnap = await query.get()
            let events = []

            if (querySnap.docs.length === 0) {
                dispatch(asyncActionFinish())
                return querySnap;
            }

            for (let i = 0; i < querySnap.docs.length; i++) {
                let evt = {...querySnap.docs[i].data(), id: querySnap.docs[i].id}
                events.push(evt)
            }

            dispatch({type: FETCH_EVENTS, payload: { events }})
            dispatch(asyncActionFinish())
            return querySnap;
        } catch (e) {
            dispatch(asyncActionError());
            errorNotification();
            throw new Error({
                _error: e.message
            })
        }

    }

export const addEventComment = (eventId, values, parentId) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        const user = firebase.auth().currentUser;
        let newComment = {
            photoURL: profile.photoURL || '/assets/img/user.png',
            displayName: profile.displayName,
            text: values.comment,
            parentId: parentId,
            date: Date.now(),
            uid: user.uid,
        }
        try {
            await firebase.push(`event_chat/${eventId}`, newComment);
            successNotification('Success!', 'Your comment has been submitted' )
        } catch (ex) {
            errorNotification();
            throw new Error({
                _error: ex.message
            })
        }
    }