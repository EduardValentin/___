import * as Sequelize from 'sequelize';
import { INTEGER, STRING } from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface CommentAttributes    {
  up_votes: number;
  content: string;
}

export type CommentInstance = Sequelize.Instance<CommentAttributes> & CommentAttributes;

export default (sequelize: Sequelize.Sequelize) => {

    const attributes: SequelizeAttributes<CommentAttributes> = {
      up_votes: { type: INTEGER },
			content: { type: STRING },
    };

    const Comment = sequelize.define<CommentInstance, CommentAttributes>("Comment", attributes);

    Comment.associate = (models) => {
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      
      Comment.hasMany(models.Comment, {
        foreignKey: 'comment_id',
      });
    };
    return Comment;
  };


 