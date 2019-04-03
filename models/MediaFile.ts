import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface MediaFileAttributes {
  id?: number,
  name: string;
  group_id?: number,
  thumbnail?: string,
  type: string;
}

export type MediaFileInstance = Sequelize.Instance<MediaFileAttributes> & MediaFileAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<MediaFileAttributes> = {
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MediaGroups',
          key: 'id',
        }
      },
			type: { type: Sequelize.STRING },
    };

    const MediaFile  = sequelize.define<MediaFileInstance, MediaFileAttributes>("MediaFile", attributes);

    MediaFile.associate = (models) => {
      MediaFile.belongsTo(models.MediaGroup, {
        foreignKey: 'group_id',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
    };

    return MediaFile;
  };
