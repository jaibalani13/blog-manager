const users = require('../controllers/user.controller');

module.exports = (app) => {

  // Create 50k users
  app.post('/generateUsers', users.generateUsers);
}
