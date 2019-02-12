import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface ArticleAttributes    {
  title: string;
}

export type ArticleInstance = Sequelize.Instance<ArticleAttributes> & ArticleAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<ArticleAttributes> = {
			title: { type: Sequelize.STRING },
    };
    const Article  = sequelize.define<ArticleInstance, ArticleAttributes>("Article", attributes);
    Article.associate = (models) => {
      Article.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      
      Article.belongsToMany(models.Tag, {
        through: 'ArticlesTags',
        foreignKey: 'article_id', 
        otherKey: 'tag_id'
      });
    };
    return Article;
  };

 