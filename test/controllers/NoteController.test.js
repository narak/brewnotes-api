const request = require('supertest');
const { beforeAction, afterAction } = require('../setup/_setup');
const Note = require('../../api/models/Note');

let api;
let token;

beforeAll(async () => {
    api = await beforeAction();

    const res = await request(api)
        .post('/public/user')
        .set('Accept', /json/)
        .send({
            email: 'noteuser@hostname',
            password: 'pw',
            password2: 'pw',
        })
        .expect(200);

    token = res.body.token;
});

afterAll(() => {
    afterAction();
});

const mockNote = {
    name: 'brew note 1',
    brewed_on: new Date(),
    stages: {
        first_runnings: { gravity: 'sg1' },
    },
};

const mockNote2 = {
    name: 'brew note 2',
    brewed_on: new Date(),
    stages: {
        first_runnings: { gravity: 'sg2' },
        second_runnings: { gravity: 'sg3' },
    },
};

test('Note | create', async () => {
    const res = await request(api)
        .post('/private/notes')
        .set('Accept', /json/)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send(mockNote)
        .expect(200);

    const resNote = res.body.rows[0];
    expect(resNote).toBeTruthy();

    const note = await Note.findById(resNote.id);
    expect(note.name).toBe(resNote.name);

    await note.remove();
});

test('Note | update', async () => {
    const note = await Note.create(mockNote);

    const res = await request(api)
        .post('/private/notes/' + note.id)
        .set('Accept', /json/)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send(mockNote2)
        .expect(200);

    const resNote = res.body.rows[0];
    expect(resNote).toBeTruthy();

    const updatedNote = await Note.findById(resNote.id);
    const json = updatedNote.toJSON();
    delete json.id;

    expect(json).toEqual(mockNote2);

    await note.remove();
});

test('Note | get', async () => {
    const note = await Note.create(mockNote);

    const res = await request(api)
        .get('/private/notes/' + note.id)
        .set('Accept', /json/)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .expect(200);

    const resNote = res.body.rows[0];
    expect(resNote).toBeTruthy();
    expect(note.name).toBe(resNote.name);

    await note.remove();
});

test('Note | getAll', async () => {
    const note = await Note.create(mockNote);
    const note2 = await Note.create(mockNote2);

    const res = await request(api)
        .get('/private/notes')
        .set('Accept', /json/)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .expect(200);

    const resNote = res.body.rows[0];
    expect(resNote).toBeTruthy();
    expect(note.name).toBe(resNote.name);
    await note.remove();

    const resNote2 = res.body.rows[1];
    expect(resNote2).toBeTruthy();
    expect(note2.name).toBe(resNote2.name);
    await note2.remove();
});
