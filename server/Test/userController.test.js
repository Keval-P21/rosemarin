const app = require('../index');
const router = require('../router');
const supertest = require('supertest');
const session = require('supertest-session');

const User = require('../models/User');
const Sequelize = require('sequelize');

const testSession = null;
beforeEach(() => {
  testSession = session(app);
});
describe('User API', () => {
  it('should login', async () => {
    testSession
      .post('/login')
      .send({ email: 'test@gmail.com', password: 'password' })
      .expect(200)
      .end();
  });
});
