import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Settings from 'api/settings';
import * as User from 'api/user';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'app/APP_LOADING':
      return state.merge({ appLoading: true });
    case 'app/APP_LOADED':
      return state.merge({ appLoading: false });
    case 'app/APP_ERROR':
      return state.merge({ appError: action.payload });
    case 'app/LOGIN_ERROR':
      return state.set('loginError', action.payload.errors[0]);
    case 'app/LOGIN_SUCCESS':
      return state.set('user', action.payload);
    case 'app/LOGOUT':
      return state.set('user', {});
    case 'app/TEMPLATE_FETCHING':
      return state.set('template', {
        loading: true,
        data: null,
      });
    case 'app/TEMPLATE_FETCHED':
      return state.set('template', {
        loading: false,
        data: action.payload,
      });
    default:
      return state;
  }
}

// ========================= Actions =========================

export const appLoading = createAction('app/APP_LOADING');
export const appLoaded = createAction('app/APP_LOADED');
export const appError = createAction('app/APP_ERROR');

export const loginUser = createAction('app/LOGIN_SUCCESS');
export const logout = createAction('app/LOGOUT');

export const templateFetching = createAction('app/TEMPLATE_FETCHING');
export const templateFetched = createAction('app/TEMPLATE_FETCHED');

// ========================= Async actions =========================

export const fetchDefaultTemplate = () => dispatch => {
  dispatch(templateFetching());
  return Settings.getSetting('Template')
    .then((response) => {
      dispatch(templateFetched(response.body.data));
    })
    .catch((error) => {
      dispatch(appError(error));
      dispatch(templateFetched(null));
    });
};

export const logInAction = (credentials) => dispatch => {
  return User.login(credentials).then(res => {
    document.cookie = `maintainer-token=${res.body.data.token}; Expires 9 Feb 9999`;
    dispatch(loginUser(res.body.data)); // store user details
    window.location.hash = '/admin';
  }).catch(error => {
    dispatch(appError(error));
  });
};

export const fetchUserDetails = () => dispatch => {
  return User.getUserDetails().then(res => {
    dispatch(loginUser(res.body.data)); // store user details
  }).catch(error => {
    dispatch(appError(error));
  });
};
