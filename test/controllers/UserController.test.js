const request = require('supertest');
const { beforeAction, afterAction } = require('../setup/_setup');
const User = require('../../api/models/User');

let api;

beforeAll(async () => {
    api = await beforeAction();
});

afterAll(() => {
    afterAction();
});

const mockUser = {
    email: 'apiuser@hostname',
    password: 'test_password',
    password2: 'test_password',
};

test('User | create', async () => {
    const res = await request(api)
        .post('/public/user')
        .set('Accept', /json/)
        .send(mockUser)
        .expect(200);

    const resUser = res.body.rows[0];
    expect(resUser).toBeTruthy();

    const user = await User.findOne({ email: mockUser.email });

    expect(user.get('id')).toBe(resUser.id);
    expect(user.get('email')).toBe(resUser.email);

    await user.remove();
});

test('User | login', async () => {
    const user = await User.create({
        email: mockUser.email,
        password: mockUser.password,
    });

    const res = await request(api)
        .post('/public/login')
        .set('Accept', /json/)
        .send({
            email: mockUser.email,
            password: mockUser.password,
        })
        .expect(200);

    expect(res.body.token).toBeTruthy();

    expect(user).toBeTruthy();

    await user.remove();
});

test('User | get all (auth)', async () => {
    const user = await User.create({
        email: mockUser.email,
        password: mockUser.password,
    });

    const res = await request(api)
        .post('/public/login')
        .set('Accept', /json/)
        .send({
            email: mockUser.email,
            password: mockUser.password,
        })
        .expect(200);

    expect(res.body.token).toBeTruthy();

    const res2 = await request(api)
        .get('/private/users')
        .set('Accept', /json/)
        .set('Authorization', `Bearer ${res.body.token}`)
        .set('Content-Type', 'application/json')
        .expect(200);

    expect(res2.body.rows).toBeTruthy();
    expect(res2.body.rows.length).toBe(1);

    await user.remove();
});
