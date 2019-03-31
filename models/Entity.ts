import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';
import { PageInstance } from './Page';
import { EntityPageInstance } from './EntityPage';

export interface EntityAttributes {
  id?: number,
  name: string;
  template_id?: number;
}

export interface EntityInstance extends Sequelize.Instance<EntityAttributes>, EntityAttributes {
  addPage: Sequelize.BelongsToManyAddAssociationMixin<PageInstance, PageInstance['id'], EntityPageInstance>;
  getPage: Sequelize.BelongsToManyGetAssociationsMixin<PageInstance>;
};

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<EntityAttributes> = {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: Sequelize.STRING, allowNull: false, unique: true, },
    template_id: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: true,
      references: {
        model: 'Templates',
        key: 'id',
      }
    }
  };

  const Entity = sequelize.define<EntityInstance, EntityAttributes>("Entity", attributes);
  Entity.associate = (models) => {
    Entity.belongsTo(models.Template, {
      foreignKey: 'template_id',
      targetKey: 'id',
    });

    Entity.hasMany(models.UIControl, {
      foreignKey: 'entity_id',
    });

    Entity.belongsToMany(models.Page, {
      through: models.EntityPage,
      foreignKey: 'entity_id',
      otherKey: 'page_id',
    });
  }
  return Entity;
};