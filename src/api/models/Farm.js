import mongoose from '../../database/index.js';

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  distance: { type: Number, required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
});

const Farm = mongoose.model('Farm', FarmSchema);

export default Farm;