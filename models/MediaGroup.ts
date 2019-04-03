import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';
import { MediaFileAttributes } from './MediaFile';

export interface MediaGroupAttributes {
  id?: number,
  parent_id? :number,
  MediaFiles? : MediaFileAttributes[],
  name: string;
}

export type MediaGroupInstance = Sequelize.Instance<MediaGroupAttributes> & MediaGroupAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<MediaGroupAttributes> = {
      name: { type: Sequelize.STRING },
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'MediaGroups',
          key: 'id',
        },
      }
    };
    const MediaGroup = sequelize.define<MediaGroupInstance, MediaGroupAttributes>('MediaGroup', attributes);

    MediaGroup.associate = (models) => {
      MediaGroup.hasMany(models.MediaFile, {
        foreignKey: 'group_id',
      });

      MediaGroup.hasMany(models.MediaGroup, {
        foreignKey: 'parent_id',
      });
    };
    return MediaGroup;
  };
