import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface TextAttributes {
	content: string;
}

export type TextInstance = Sequelize.Instance<TextAttributes> & TextAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<TextAttributes> = {
			content: { type: Sequelize.STRING },
    };
    const Text = sequelize.define<TextInstance, TextAttributes>("Text", attributes);
    Text.associate = (models) => {
      Text.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
    };
    return Text;
  };

 