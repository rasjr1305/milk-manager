import mongoose from '../../database/index.js';

const FarmMilkProductionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  price: { type: Number },
});

const FarmMilkProduction = mongoose.model('FarmMilkProduction', FarmMilkProductionSchema);

export default FarmMilkProduction;