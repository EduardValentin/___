import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';
import { EntityInstance, EntityAttributes } from './Entity';
import { EntityPageInstance } from './EntityPage';

export interface PageAttributes {
  id?: number;
  label: string;
  link: string;

  Entities?: EntityAttributes[],
}

export interface PageInstance extends Sequelize.Instance<PageAttributes>, PageAttributes {
  addEntities: Sequelize.BelongsToManyAddAssociationMixin<EntityInstance, EntityInstance['id'], EntityPageInstance>;
  addEntity: Sequelize.BelongsToManyAddAssociationMixin<EntityInstance, EntityInstance['id'], EntityPageInstance>;
  getEntity: Sequelize.BelongsToManyGetAssociationsMixin<EntityInstance>;
  setEntities: Sequelize.BelongsToManySetAssociationsMixin<EntityInstance, EntityInstance['id'], EntityPageInstance>
  removeEntity: Sequelize.BelongsToManyRemoveAssociationMixin<EntityInstance, EntityInstance['id']>;
  removeEntities: Sequelize.BelongsToManyRemoveAssociationsMixin<EntityInstance, EntityInstance['id']>;
};

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<PageAttributes> = {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    label: { type: Sequelize.STRING, allowNull: false },
    link: { type: Sequelize.STRING, allowNull: false, unique: true },
  };
  const Page = sequelize.define<PageInstance, PageAttributes>('Page', attributes);
  Page.associate = (models) => {
    Page.belongsToMany(models.Entity, {
      through: models.EntityPage,
      foreignKey: 'page_id',
      otherKey: 'entity_id',
      onDelete: 'CASCADE',
    });
  };

  return Page;
};
