import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import apiMiddleware from '../middleware/api';
import loggerMiddleware from 'redux-logger';
import reducer from './reducer';

// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';

// const reducer = combineReducers(reducers);
const createStoreWithMiddleware = compose(
	// applyMiddleware(thunkMiddleware,apiMiddleware,loggerMiddleware),
	applyMiddleware(loggerMiddleware),
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

/**
 * Creates a preconfigured store for this example.
 */
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}