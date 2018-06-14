import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: String,
    friend: String,
});

export default mongoose.model('Friend', schema);