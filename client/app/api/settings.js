import { request } from 'api/base.js';

export function getTemplate() {
  return request('GET', '/settings/template', {});
}