let mongoose=require('mongoose');
const  validator  = require('validator');
let usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true,
        Validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email');
            }
        }
    },

    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        maxlength:[10,'phone number should  not be more than 10 digits'],
        minlength:[10,'phone number should  not be more than 10 digits']

    },
    age: {
        type: Number,
        required: true
    }
})
let Users = new mongoose.model('User', usersSchema);
module.exports =Users;