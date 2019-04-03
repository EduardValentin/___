import { request } from 'api/base.js';

export function fetchAll() {
  return request('GET', '/pages', {});
}

export function create(params) {
  return request('POST', '/pages/create', params);
}

export function edit(id, params) {
  return request('PUT', `/pages/${id}`, params);
}

export function destroy(id) {
  return request('DELETE', `/pages/delete/${id}`, {});
}