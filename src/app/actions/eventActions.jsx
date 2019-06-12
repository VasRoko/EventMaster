import { DELETE_EVENT, UPDATE_EVENT } from '../../const';
import { successNotification, errorNotification } from '../common/notifications/notification';
import { createNewEvent } from '../common/util/helpers';

export const createEvent = (event) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
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
            return createdEvent;
        
        } catch (e) {
            throw new Error({
                _error: e.message
            })
        }
    }
}

export const updateEvent = (event) => {
    return async dispatch => {
        try {
            dispatch({
                type: UPDATE_EVENT,
                payload: {
                    event
                }
            });
            successNotification('Success!', 'Event has been updated');
        } catch (e) {
            errorNotification();
        }
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
