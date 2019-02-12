import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface TagAttributes {
    id?: number;
    name: string;
    color: string;
}

export type TagInstance = Sequelize.Instance<TagAttributes> & TagAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<TagAttributes> = {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING },
      color: { type: Sequelize.STRING },
    };
    const Tag = sequelize.define<TagInstance, TagAttributes>('Tag', attributes);
    Tag.associate = (models) => {
      Tag.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      Tag.belongsToMany(models.Article, {through: 'ArticlesTags', foreignKey: 'tag_id', otherKey: 'article_id'});
    };
    return Tag;
  };

 