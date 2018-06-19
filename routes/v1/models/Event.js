import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: String,
    name: String,
    description: String,
    price: Number,
    till: Date,
    from: Date,
    image: String,
    privateEvent: Boolean
});

export default mongoose.model('Event', schema);