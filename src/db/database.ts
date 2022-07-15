import { Sequelize } from 'sequelize-typescript';

import { Company } from '../models/Company';

const connection = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  logging: false,
  models: [Company]
});

export default connection;
