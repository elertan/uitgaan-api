import mongoose from 'mongoose';

const schema = mongoose.Schema({
  user1: String,
  user2: String,
});

export default mongoose.model('Friend_UserXUser', schema);