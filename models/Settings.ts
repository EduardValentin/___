import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface SettingsAttributes {
    id?: number;
    setting_name: string;
    setting_value: string;
    createdAt?: Date,
    updatedAt?: Date,
}

export type SettingsInstance = Sequelize.Instance<SettingsAttributes> & SettingsAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<SettingsAttributes> = {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      setting_name: { type: Sequelize.STRING, allowNull: false, },
      setting_value: { type: Sequelize.STRING, allowNull: false, },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    };
    return sequelize.define<SettingsInstance, SettingsAttributes>('Settings', attributes);;
  };

 