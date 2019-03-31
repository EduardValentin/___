import { request } from 'api/base.js';

export function fetchAll() {
  return request('GET', '/pages', {});
}

export function create(params) {
  return request('POST', '/pages/create', params);
}