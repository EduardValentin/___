import { request } from 'api/base.js';

export function getSetting(setting) {
  return request('GET', `/settings/setting/${setting}`, {});
}