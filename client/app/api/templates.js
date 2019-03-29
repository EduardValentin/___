import { request, uploadFile } from 'api/base.js';
import dissoc from 'ramda/es/dissoc';

export function getAll() {
  return request('GET', '/templates', {});
}

export function addTemplate(params) {
  return uploadFile('/templates/create', params.template, dissoc('template', params));
}

export function deleteTemplate(id) {
  return request('DELETE', `/templates/delete/${id}`, {});
}
