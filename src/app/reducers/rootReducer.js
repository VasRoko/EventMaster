import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import authReducer from './authReduces';
import asyncReducer from '../async/asyncReducer';

const rootReducer = combineReducers({
    events: eventReducer,
    form: FormReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    toastr: toastrReducer
})

export default rootReducer;