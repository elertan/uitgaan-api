import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    dateOfBirth: Date,
    avatar: String,
});

export default mongoose.model('User', schema);