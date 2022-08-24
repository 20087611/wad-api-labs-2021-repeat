import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const KeywordSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true }
});

export default mongoose.model('Keyword', KeywordSchema);