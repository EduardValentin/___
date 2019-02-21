"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_bluebird_promise_1 = require("superagent-bluebird-promise");
const store_1 = require("store");
const session_1 = require("session");
const ramda_1 = require("ramda");
const app_1 = require("ducks/app/app");
const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
const prefix = 'api/v1';
function createFullUrl(url) {
    return `${__BASE_URL__}/${prefix}${url}`;
}
function request(method, url, params) {
    let promise = superagent_bluebird_promise_1.default(method, createFullUrl(url)).set(defaultHeaders).set({ PASSWORD: session_1.getSession() });
    if (params) {
        if (method === 'GET') {
            promise = promise.query(params);
        }
        else {
            promise = promise.send(params);
        }
    }
    return promise.catch(handleError);
}
exports.request = request;
function simpleRequest(method, url, params) {
    let promise = superagent_bluebird_promise_1.default(method, createFullUrl(url)).set(defaultHeaders).set({ PASSWORD: session_1.getSession() });
    if (params) {
        if (method === 'GET') {
            promise = promise.query(params);
        }
        else {
            promise = promise.send(params);
        }
    }
    return promise.catch(handleError);
}
exports.simpleRequest = simpleRequest;
/**
 * function to handle request errors
 * by default it sets appError: err in redux store
 * one can check err.status for more detalied error handling
 * @param {*} err;
 */
function handleError(err) {
    store_1.default.dispatch(app_1.appError(err));
    throw err;
}
// form Data file upload
function uploadFile(url, file, fields = {}, onProgress = () => { }) {
    const request = superagent_bluebird_promise_1.default('POST', createFullUrl(url))
        .set(ramda_1.omit(['Content-Type'], defaultHeaders)) // superagent will set conten Type to multi part automatically
        .on('progress', onProgress);
    ramda_1.mapObjIndexed((el, key) => {
        request.field(key, el);
    }, fields);
    request.attach('file', file); // only 1 file per request
    return request.promise();
}
exports.uploadFile = uploadFile;
//# sourceMappingURL=base.js.map