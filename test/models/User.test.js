const { beforeAction, afterAction } = require('../setup/_setup');

const User = require('../../api/models/User');
const bcryptService = require('../../api/services/bcrypt.service');

beforeAll(async () => {
    await beforeAction();
});

afterAll(() => {
    afterAction();
});

const mockUser = {
    email: 'modeluser@hostname',
    password: 'test_password',
};

beforeEach(async () => {
    const user = new User(mockUser);
    await user.save();
});

test('User is created correctly', async () => {
    const user = await User.findOne({ email: mockUser.email });

    // check if user is created
    expect(user.get('email')).toBe(mockUser.email);
    // check if password is encrypted
    expect(bcryptService().comparePassword(mockUser.password, user.get('password'))).toBeTruthy();

    await user.remove();
});

test('User is updated correctly', async () => {
    const user = await User.findOne({ email: mockUser.email });

    const newEmail = 'modeluser_2@hostname';
    user.email = newEmail;
    user.role = 'admin';
    await user.save();

    const user2 = await User.findOne({ email: newEmail });

    expect(user2.get('email')).toBe(newEmail);

    await user2.remove();
});
