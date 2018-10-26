// const request = require('supertest');
// const { beforeAction, afterAction } = require('../setup/_setup');
// const User = require('../../api/models/User');

// let api;

// beforeAll(async () => {
//     api = await beforeAction();
// });

// afterAll(() => {
//     afterAction();
// });

test('dummy', async () => {});

// test('User | create', async () => {
//     const res = await request(api)
//         .post('/public/user')
//         .set('Accept', /json/)
//         .send({
//             email: 'martin@mail.com',
//             password: 'securepassword',
//             password2: 'securepassword',
//         })
//         .expect(200);

//     const resUser = res.body.rows[0];
//     expect(resUser).toBeTruthy();

//     const user = await User.findById(resUser.uuid);

//     expect(user.uuid).toBe(resUser.uuid);
//     expect(user.email).toBe(resUser.email);

//     await user.destroy();
// });

// test('User | login', async () => {
//     const user = await User.create({
//         email: 'martin@mail.com',
//         password: 'securepassword',
//     });

//     const res = await request(api)
//         .post('/public/login')
//         .set('Accept', /json/)
//         .send({
//             email: 'martin@mail.com',
//             password: 'securepassword',
//         })
//         .expect(200);

//     expect(res.body.token).toBeTruthy();

//     expect(user).toBeTruthy();

//     await user.destroy();
// });

// test('User | get all (auth)', async () => {
//     const user = await User.build({
//         email: 'martin@mail.com',
//         password: 'securepassword',
//     }).save();

//     const res = await request(api)
//         .post('/public/login')
//         .set('Accept', /json/)
//         .send({
//             email: 'martin@mail.com',
//             password: 'securepassword',
//         })
//         .expect(200);

//     expect(res.body.token).toBeTruthy();

//     const res2 = await request(api)
//         .get('/private/users')
//         .set('Accept', /json/)
//         .set('Authorization', `Bearer ${res.body.token}`)
//         .set('Content-Type', 'application/json')
//         .expect(200);

//     expect(res2.body.rows).toBeTruthy();
//     expect(res2.body.rows.length).toBe(1);

//     await user.destroy();
// });
