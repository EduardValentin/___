import { request } from 'api/base.js';

export function getAll() {
  return request('GET', '/templates', {});
}