const mongoose = require('mongoose');
const { schemaOptions } = require('./common');

const StageDef = {
    gravity: String,
    note: String,
};

const NoteSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, index: { unique: true } },
        brewed_on: Date,
        stages: {
            first_runnings: StageDef,
            second_runnings: StageDef,
            pre_boil: StageDef,
            pre_ferment: StageDef,
            post_ferment: StageDef,
            post_conditioning: StageDef,
        },
    },
    schemaOptions
);

module.exports = mongoose.model('Note', NoteSchema);
