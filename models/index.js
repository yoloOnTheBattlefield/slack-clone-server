import Sequelize from 'sequelize';
import keys from '../keys';

const { database, user, password } = keys;
const sequelize = new Sequelize(database, user, password, {
  dialect: 'postgres',

  define: {
    underscored: true,
  },
});
const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

// port 5432

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
