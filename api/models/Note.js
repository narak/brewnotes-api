const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Note = sequelize.define(
    'Note',
    {
        uuid: {
            type: Sequelize.UUID,
            primaryKey: true,
        },
        name: Sequelize.STRING,
        brew_id: Sequelize.UUID,
        brewed_on: Sequelize.DATE,
        first_runnings_gravity: Sequelize.FLOAT,
        first_runnings_note: Sequelize.TEXT,
        second_runnings_gravity: Sequelize.FLOAT,
        second_runnings_note: Sequelize.TEXT,
        pre_boil_gravity: Sequelize.FLOAT,
        pre_boil_note: Sequelize.TEXT,
        pre_ferment_gravity: Sequelize.FLOAT,
        pre_ferment_note: Sequelize.TEXT,
        post_ferment_gravity: Sequelize.FLOAT,
        post_ferment_note: Sequelize.TEXT,
    },
    { tableName: 'notes' }
);

// eslint-disable-next-line
Note.prototype.toJSON = function() {
    console.log(this.get());
    return this.get();
};

module.exports = Note;
