import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from '../../const';
import { successNotification, errorNotification } from '../common/notifications/notification';

export const createEvent = (event) => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_EVENT,
                payload: {
                    event
                }
            });
            successNotification('Success!', 'Event has been created');
        } catch (e) {
            errorNotification();
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
