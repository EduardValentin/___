import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface MediaGroupAttributes {
    name: string;
}

export type MediaGroupInstance = Sequelize.Instance<MediaGroupAttributes> & MediaGroupAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<MediaGroupAttributes> = {
      name: { type: Sequelize.STRING },
    };
    const MediaGroup = sequelize.define<MediaGroupInstance, MediaGroupAttributes>('MediaGroup', attributes);
    MediaGroup.associate = (models) => {
      MediaGroup.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });

      MediaGroup.hasMany(models.MediaFile, {
        foreignKey: 'media_file_id', 
      });
    };
    return MediaGroup;
  };

 