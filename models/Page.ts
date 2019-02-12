import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface PageAttributes {
    id?: number;
    label: string;
    link: string;
}

export type PageInstance = Sequelize.Instance<PageAttributes> & PageAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<PageAttributes> = {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      label: { type: Sequelize.STRING, allowNull: false },
      link: { type: Sequelize.STRING, allowNull: false, unique: true },
    };
    const Page = sequelize.define<PageInstance, PageAttributes>('Page', attributes);
    Page.associate = (models) => {
      Page.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      Page.belongsToMany(models.Article, {
        through: 'PagesTemplates', 
        foreignKey: 'page_id', 
        otherKey: 'template_id'
      });
    };
    
    return Page;
  };

 