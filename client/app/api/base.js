import superagent from 'superagent-bluebird-promise';
import store from 'store.js';
import { getUserToken } from 'session.js';
import { omit, mapObjIndexed } from 'ramda';
import { appError } from 'ducks/app.js';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const prefix = 'api/v1';

function createFullUrl(url) {
  return `${__BASE_URL__}/${prefix}${url}`;
}

export function request(method, url, params) {
  let promise = superagent(method, createFullUrl(url)).set(defaultHeaders).set({ AUTHORIZATION: getUserToken() });

  if (params) {
    if (method === 'GET') {
      promise = promise.query(params);
    } else {
      promise = promise.send(params);
    }
  }

  return promise.catch(handleError);
}

export function simpleRequest(method, url, params) {
  let promise = superagent(method, createFullUrl(url)).set(defaultHeaders).set({ AUTHORIZATION: getUserToken() });

  if (params) {
    if (method === 'GET') {
      promise = promise.query(params);
    } else {
      promise = promise.send(params);
    }
  }

  return promise.catch(handleError);
}

/**
 * function to handle request errors
 * by default it sets appError: err in redux store
 * one can check err.status for more detalied error handling
 * @param {*} err;
 */
function handleError(err) {
  store.dispatch(appError(err));
  throw err;
}

// form Data file upload
export function uploadFile(url, file, fields = {}, onProgress = () => { }) {
  const request = superagent('POST', createFullUrl(url))
    .set(omit(['Content-Type'], defaultHeaders)) // superagent will set conten Type to multi part automatically
    .on('progress', onProgress);

  mapObjIndexed((el, key) => { // each key will get set in body, for nested keys name it data[nest[etc]]
    request.field(key, el);
  }, fields);

  request.attach('file', file); // only 1 file per request

  return request.promise();
}
