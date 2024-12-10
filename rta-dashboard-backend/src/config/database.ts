import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rta_dashboard_demo', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;