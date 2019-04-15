import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import ReduxThunk from 'redux-thunk';

export const configureStore = (preloadedState) => {
    const moddlewares = [ReduxThunk];
    const moddlewareEnhancer  = applyMiddleware(...moddlewares);

    const storeEnhancers = [moddlewareEnhancer];
    const composedEnhancer = composeWithDevTools(...storeEnhancers);
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