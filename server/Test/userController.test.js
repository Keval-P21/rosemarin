const request = require('supertest')('http://localhost:3001');

const account = {
  email: 'test@gmail.com',
  password: 'password',
};

let loginResponse;

describe('User API - Authenticated path', () => {
  beforeEach(async () => {
    loginResponse = await request.post('/login').send(account);
  });
  it('should allow access to /me route when logged in', async () => {
    const response = await request
      .get('/me')
      .set('Cookie', [loginResponse.header['set-cookie'][0]]);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.sid).toBe(1);
    expect(response.body.isAuthenticated).toBe(true);
  });
});
