import { request } from 'api/base.js';

export function getAllEntities() {
  return request('GET', '/entities', {});
}

export function fetchOne(withId) {
  return request('GET', `/entities/${withId}`, {});
}

export function newEntity(payload) {
  return request('POST', '/entities/new', payload);
}