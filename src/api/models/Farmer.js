import mongoose from '../../database/index.js';
import validator from 'mongoose-validator';

const emailValidator = [
  validator({
    validator: 'isEmail',
    passIfEmpty: false,
    httpStatus: 400,
  }),
];

const FarmerSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, validate: emailValidator, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
  },
  { versionKey: false },
);

const Farmer = mongoose.model('Farmer', FarmerSchema);

export default Farmer;