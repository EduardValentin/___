import Database from '../models/index';
import { FindOptions } from 'sequelize';
import BaseService from './base_service';
import { MediaFileAttributes } from '../models/MediaFile';
import { MediaGroupAttributes } from '../models/MediaGroup';

export default class MediaService extends BaseService {

  constructor() {
    super();
  }

  public allGroups(options?: FindOptions<MediaGroupAttributes>) {
    return Database.MediaGroup.findAll(options);
  }

  public findGroup(options: FindOptions<MediaGroupAttributes>) {
    return Database.MediaGroup.find(options);
  }

  public findFile(options: FindOptions<MediaFileAttributes>) {
    return Database.MediaFile.find(options);
  }

  public allFiles(options?: FindOptions<MediaFileAttributes>) {
    return Database.MediaFile.findAll(options);
  }

  public insertFile(attributes: MediaFileAttributes) {
    return Database.MediaFile.create(attributes);
  }

  public insertGroup(attributes: MediaGroupAttributes) {
    return Database.MediaGroup.create(attributes);
  }

  public deleteFile(id: number) {
    return Database.MediaFile.destroy({
      where: {
        id,
      }
    })
  }

  public deleteGroup(id: number) {
    return Database.MediaGroup.destroy({
      where: {
        id,
      }
    })
  }
}