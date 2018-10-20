const privateRoutes = {
    'GET /users': 'UserController.getAll',

    'POST /notes': 'NoteController.create',
    'GET /notes/:uuid': 'NoteController.get',
    'POST /notes/:uuid': 'NoteController.update',
    'GET /notes': 'NoteController.getAll',
    'DELETE /notes/:uuid': 'NoteController.delete',
};

module.exports = privateRoutes;
