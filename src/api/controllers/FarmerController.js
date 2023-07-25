import Farmer from '../models/Farmer.js';

class FarmerController {
  static async create(req, res) {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }

    try {
      const createdFarmer = await Farmer.create({ email, name, password });

      const createdFarmerObj = createdFarmer.toObject();
      delete createdFarmerObj.password;

      return res.status(201).json(createdFarmerObj);
    } catch (err) {
      if (err.code && err.code === 11000) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      return res.json(err);
    }
  }
}

export default FarmerController;