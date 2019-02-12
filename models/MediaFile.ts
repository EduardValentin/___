import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface MediaFileAttributes    {
  path: string;
  type: string;
}

export type MediaFileInstance = Sequelize.Instance<MediaFileAttributes> & MediaFileAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<MediaFileAttributes> = {
      path: { type: Sequelize.STRING },
			type: { type: Sequelize.STRING },
    };
    const MediaFile  = sequelize.define<MediaFileInstance, MediaFileAttributes>("MediaFile", attributes);
    MediaFile.associate = (models) => {
      MediaFile.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
    };
    return MediaFile;
  };


 