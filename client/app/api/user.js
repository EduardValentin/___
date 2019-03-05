import { request } from 'api/base.js';

export function login(credentials) {
  return request('POST', '/users/login', credentials);
}

export function getUserDetails() {
  return request('GET', '/users/current', {});
}

export function validateCredentials() {
  return request('GET', '/users');
}
