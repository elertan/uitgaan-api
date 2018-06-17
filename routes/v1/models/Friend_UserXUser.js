import mongoose from 'mongoose';

const schema = mongoose.Schema({
  user1: mongoose.Schema.Types.ObjectId,
  user2: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model('Friend_UserXUser', schema);