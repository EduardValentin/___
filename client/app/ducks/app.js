import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Settings from 'api/settings';

export default function reducer(state = Immutable({}), action) {
  switch (action.type)  {
    case 'app/APP_LOADING':
      return state.merge({ appLoading: true });
    case 'app/APP_LOADED':
      return state.merge({ appLoading: false });
    case 'app/APP_ERROR':
      return state.merge({ appError: action.payload });
    case 'app/LOGIN_ERROR':
      return state.set('loginError',  action.payload.errors[0]);
    case 'app/LOGIN_SUCCESS':
      return state.set('user', action.payload);
    case 'app/LOGOUT':
      return state.set('user', {});
    case 'app/SET_DEFAULT_TEMPLATE':
      return state.set('template', action.payload);
    default:
      return state;
  }
}

export const appLoading         = createAction('app/APP_LOADING');
export const appLoaded          = createAction('app/APP_LOADED');
export const appError           = createAction('app/APP_ERROR');

export const loginUser          = createAction('app/LOGIN');
export const logout             = createAction('app/LOGOUT');

export const setDefaultTemplate = createAction('app/SET_DEFAULT_TEMPLATE');

export const fetchDefaultTemplate = () => dispatch => {
  // dispatch(appLoading());
  return Settings.getTemplate()
    .then((response) => {
      // dispatch(appLoaded());
      dispatch(setDefaultTemplate(response.body));
    })
    .catch((error) => {
      console.error(error);
      // dispatch(appLoaded());
    });
};
