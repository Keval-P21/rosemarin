//Abandonned testing for this sprint

// const router = require('../router');
// const supertest = require('supertest');
// const app = require('../index');

// const User = require('../models/User');
// const Sequelize = require('sequelize');
// // const app = express();
// const request = require('supertest')(app);

// // session cookie Session {
// //   cookie: {
// //     path: '/',
// //     _expires: 2022-08-10T16:16:59.849Z,
// //     originalMaxAge: 3600000,
// //     httpOnly: true
// //   },
// //   sid: 1
// // }
// //Hashed
// // cookies: {
// //   sid: 's:adrTZFsP9xJRlT1mGMjvaZAlPTxvpWlP.bm039LSQzFDaFMxbI6wKDaoiXfwLoIYfXPJ/x05jpE0'
// // },

// const account = {
//   email: 'test@gmail.com',
//   password: 'password',
// };

// const login = function (request) {
//   request
//     .post('/login')
//     .send(account)
//     .end(function (err, res) {
//       if (err) {
//         throw err;
//       }
//       agent.saveCookies(res);
//     });
// };

// describe('User API', () => {
//   beforeEach(function () {
//     login(
//       request
//       //   , function (loginAgent) {
//       //   agent = loginAgent;
//       // }
//     );
//   });
//   it('should allow access to /me route when logged in', async () => {
//     const req = request.get('/me');
//     agent.attachCookies(req);
//     req.expect(200);
//   });
// });
