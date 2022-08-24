import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    id: { type: Number, unique: true, required: true },
    logo_path: { type: String },
    name: { type: String }
});

export default mongoose.model('Company', CompanySchema);