'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { DatabasebInterface } from '../typings/DatabaseInterface/types';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];


let sequelize: Sequelize.Sequelize;

if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

let db: DatabasebInterface = {
	sequelize,
	Sequelize,
	User: null,
	Role: null,
	Settings: null,
	Entity: null,
	UIControl: null,
	Template: null,
	Page: null,
	MediaFile: null,
	MediaGroup: null,
	EntityPage: null,
};

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {

		const model: any = sequelize.import(path.join(__dirname, file));
		if (model) {
			db[model.name] = model;
		}
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
