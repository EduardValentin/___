import { request, uploadFile } from 'api/base.js';

export const getAllGroups = () => {
  return request('GET', '/media/groups', {});
};