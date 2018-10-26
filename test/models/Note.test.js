const { beforeAction, afterAction } = require('../setup/_setup');

const Note = require('../../api/models/Note');

beforeAll(async () => {
    await beforeAction();
});

afterAll(async () => {
    afterAction();
});

const mockNote = {
    name: 'brew note 1',
    brewed_on: new Date(),
    stages: {
        first_runnings: { gravity: 'sg1' },
    },
};

beforeEach(async () => {
    const note = new Note(mockNote);
    await note.save();
});

test('Note is created correctly', async () => {
    const note = await Note.findOne({ name: mockNote.name });
    expect(note).toBeTruthy();
    await note.remove();
});

test('Note is updated correctly', async () => {
    const note = await Note.findOne({ name: mockNote.name });

    note.stages.first_runnings.note = 'first running node';
    note.stages.second_runnings = {
        gravity: 'sg2',
        note: 'second running note',
    };
    await note.save();

    const note2 = await Note.findOne({ name: mockNote.name });
    expect(note2.stages.second_runnings.gravity).toBe('sg2');
    expect(note2.stages.second_runnings.note).toBe('second running note');
    await note2.remove();
});
