import mongoose from 'mongoose';

const schema = mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: Number,
    till: Date,
    from: Date,
    image: String,
});

export default mongoose.model('Event', schema);