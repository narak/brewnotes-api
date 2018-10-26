const privateRoutes = {
    'GET /users': 'UserController.getAll',

    'POST /notes': 'NoteController.create',
    'GET /notes/:id': 'NoteController.get',
    'POST /notes/:id': 'NoteController.update',
    'GET /notes': 'NoteController.getAll',
};

module.exports = privateRoutes;
