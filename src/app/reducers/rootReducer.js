import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import authReducer from './authReduces';

const rootReducer = combineReducers({
    events: eventReducer,
    form: FormReducer,
    modals: modalReducer,
    auth: authReducer
})

export default rootReducer;