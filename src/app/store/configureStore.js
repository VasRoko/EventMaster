import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from '../config/firebase';
import rootReducer from '../reducers/rootReducer';
import ReduxThunk from 'redux-thunk';

const ReactReduxFirebaseConf = {
    userProfile: 'users',
    attachedAuthIsReady: true,
    useFireStoreForProfile: true,
}

export const configureStore = (preloadedState) => {
    const moddlewares = [ReduxThunk.withExtraArgument({getFirebase, getFirestore})];
    const moddlewareEnhancer  = applyMiddleware(...moddlewares);

    const storeEnhancers = [moddlewareEnhancer];
    const composedEnhancer = composeWithDevTools(
        ...storeEnhancers, 
        reactReduxFirebase(firebase, ReactReduxFirebaseConf),
        reduxFirestore(firebase));
    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer,

    );

    if(process.env.NODE_ENV !== 'production') {
        if(module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const newRootReducer = require('../reducers/rootReducer').default;
                store.replaceReducer(newRootReducer)
            })
        }
    }

    return store;
}