/* eslint no-unused-vars: 0 */
/* eslint consistent-return: 0 */
/* eslint no-console: 0 */

import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'seamless-immutable';
import { reducer as form } from 'redux-form';

import app from 'ducks/app';

const initialState = Immutable({
  app: {
    appLoading: false,
  },
});

// Logging Middleware. Logs all actions to console
const logger = store => next => (action) => {
  const result = next(action);

  console.groupCollapsed('[ACTION]', action.type);
  console.log('Payload:', action.payload);

  console.log('State:', store.getState());
  console.groupEnd('[ACTION]', action.type);

  return result;
};

// Catch Errors before logger so they don't get gobbled up by the console group
const crashReporter = store => next => (action) => {
  try {
    return next(action);
  } catch (err) {
    console.groupEnd();
    console.error('Caught an exception!', err);
    throw err;
  }
};

// add reducers and their actions in ducks/
// More: https://github.com/erikras/ducks-modular-redux

const reducer = combineReducers(Object.assign({}, {
  app,
  form,
}));

let finalCreateStore = compose(applyMiddleware(thunk, crashReporter, logger));

finalCreateStore = finalCreateStore(createStore);

const store = finalCreateStore(reducer, initialState);

export default store;