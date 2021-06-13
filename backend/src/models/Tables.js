const { Schema, model } = require('mongoose');

const tableSchema = new Schema({
    name:{
        type: String,
        required: true,
        
    },
    title:{
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    date: {
        type: Date, 
        default: Date.now,
    },
    user: {
        type: String
    }
});
module.exports = model('Table', tableSchema);
