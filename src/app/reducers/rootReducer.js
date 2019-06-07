import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer }  from 'redux-firestore';
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import asyncReducer from '../async/asyncReducer';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    events: eventReducer,
    form: FormReducer,
    modals: modalReducer,
    async: asyncReducer,
    toastr: toastrReducer
})


export default rootReducer;