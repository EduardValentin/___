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

export function drop(withId) {
  return request('DELETE', `/entities/drop/${withId}`, {});
}

export function edit(withId, params) {
  return request('PUT', `/entities/edit/${withId}`, params);
}

// ----------------- Records ---------------------------

export function fetchRecords(entity_id) {
  return request('GET', `/generic_entities/${entity_id}`, {});
}

export function addRecord(entity_id, params) {
  return request('POST', `/generic_entities/create/${entity_id}`, params);
}

export function editRecord(entity_id, recordId, params) {
  return request('PUT', `/generic_entities/edit/${entity_id}/${recordId}`, params);
}


export function deleteRecord(entity_id, recordId, params) {
  return request('DELETE', `/generic_entities/delete/${entity_id}/${recordId}`, params);
}
