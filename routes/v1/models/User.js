import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    dateOfBirth: Date,
});

export default mongoose.model('User', schema);