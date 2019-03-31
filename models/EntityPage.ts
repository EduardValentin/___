import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface EntityPageAttributes {
  id?: number,
  entity_id: number,
  page_id: number,
}

export type EntityPageInstance = Sequelize.Instance<EntityPageAttributes> & EntityPageAttributes;

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<EntityPageAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entity_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Entities',
        key: 'id',
      },
    },
    page_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Pages',
        key: 'id',
      },
    },
  };

  const EntityPage = sequelize.define<EntityPageInstance, EntityPageAttributes>("EntityPage", attributes, {
    freezeTableName: true,
  });
  return EntityPage;
};


