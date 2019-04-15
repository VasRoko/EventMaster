import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import authReducer from './authReduces';
import asyncReducer from '../../features/async';

const rootReducer = combineReducers({
    events: eventReducer,
    form: FormReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
})

export default rootReducer;