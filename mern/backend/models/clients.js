let mongoose = require('mongoose');
let clientSchema= new mongoose.Schema({
    email:{
        type: 'string',
        required: true,
    },
    password:{
        type: 'string',
        require: true
    }
})
let client = new mongoose.model('client', clientSchema);
module.exports =client;