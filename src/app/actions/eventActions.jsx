import { DELETE_EVENT } from '../../const';
import { createNewEvent } from '../common/util/helpers';
import { successNotification } from '../common/notifications/notification';
import firebase from '../config/firebase';

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

export const getEvents = () => 
    async (dispatch, getState) => {
        let today = new Date();
        const firestore = firebase.firestore();
        const eventsQuery = firestore.collection('events').where('date', '>=', today );
        try {
            let query = await eventsQuery.get()
            let events = []

            for (let i = 0; i < query.docs.length; i++) {
                let evt = {...query.docs[i].data(), id: query.docs[i].id}
                events.push(evt)
            }
            console.log(events)
        } catch (e) {
            throw new Error({
                _error: e.message
            })
        }

    }