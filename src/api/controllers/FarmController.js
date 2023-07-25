import Farm from '../models/Farm.js';
import FarmMilkProduction from '../models/FarmMilkProduction.js';
import MilkPriceUtils from '../utils/MilkPriceUtils.js';
import {Types} from 'mongoose';

class FarmController {
  static async create(req, res) {
    const { name, farmer, distance } = req.body;

    if (!distance || !farmer || !name) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }

    try {
      const farm = await Farm.create({ name, farmer, distance });

      return res.status(201).json(farm);
    } catch (err) {
      return res.json(err);
    }
  }

  static async addMilkProduction(req, res) {
    const { amount, date } = req.body;
    const { id } = req.params;

    if (!amount || !date || !id) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }

    try {
      const farm = await Farm.findById(id);

      if (!farm) {
        return res.status(404).json({ message: 'Farm not found' });
      }

      const farmMilkProduction = await FarmMilkProduction.create({ amount, date, farm });

      return res.status(201).json(farmMilkProduction);
    } catch (err) {
      return res.json(err);
    }
  }

  static async getMilkProduction(req, res) {
    const { month } = req.body;
    const { id } = req.params;

    if (!month || !id) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }

    try {
      const farmMilkProduction = await FarmMilkProduction
        .aggregate([
          { 
            $match: {farm: Types.ObjectId(id), $expr: { $eq: [{ $month: '$date' }, month]}},
          },
          {
            $facet: {
              data: [{$match: {farm: Types.ObjectId(id), $expr: { $eq: [{ $month: '$date' }, month]}},}],
              avg: [
                {$match: {farm: Types.ObjectId(id), $expr: { $eq: [{ $month: '$date' }, month]}},},
                {$group: {_id: '$item', amount: { $avg: { $multiply: [ '$amount' ]}}}}
              ]
            }
          }
        ]);
        
      if (!farmMilkProduction) {
        return res.status(404).json({ message: 'Farm Production not found' });
      }

      return res.status(200).json(farmMilkProduction);
    } catch (err) {
      return res.json(err);
    }
  }

  static async getMilkPriceReport(req, res) {
    const { month, year } = req.body;
    const { id } = req.params;

    if ((!year && !month) || !id || (month && year)) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }

    try {
      const f = await Farm.findById(id);
      const { distance } = f;

      const farmMilkProduction = await FarmMilkProduction
        .aggregate([
          { 
              $match: {
                farm: Types.ObjectId(id),
                $expr: { $eq: month ? [{ $month: '$date' }, month] : [{ $year: '$date' }, year]}
              },
          },
          {
            $group: {
              _id: month ? '$item' : { $month: '$date' },
              totalAmount: { $sum: '$amount'} 
            }
          }
        ]);
      
      if (!farmMilkProduction) {
        return res.status(404).json({ message: 'Farm Production not found' });
      }

      const response = month 
        ? MilkPriceUtils.getMilkPrice(farmMilkProduction[0].totalAmount, month, distance)
        : farmMilkProduction.map(p => {
            const milkPrice = MilkPriceUtils.getMilkPrice(p.totalAmount, p._id, distance);  

            return milkPrice;
          });

      return res.status(200).json(response);
    } catch (err) {
      return res.json(err);
    }    
  }
}

export default FarmController;