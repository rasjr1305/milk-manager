// constants for milk prices
const MilkPrice = Object.freeze({
  BASE_PRICE_01: 180,
  BASE_PRICE_02: 195,
  DISTANCE_PRICE_01: 5,
  DISTANCE_PRICE_02: 6,
  BONUS: 1,
});

// temp dolar exchange value
const TEMP_DOLAR = 4.74;

class MilkPriceUtils {
  static getMilkBasePrice(month) {
    if (month >= 0 && month <= 5) {
      return MilkPrice.BASE_PRICE_01;
    } else if (month >= 5 && month <= 11) {
      return MilkPrice.BASE_PRICE_02;
    }

    return 0;
  }

  static getMilkDistancePrice(distance, month) {
    if ((month >= 0 && month <= 5)) {
      return distance <= 50 ? MilkPrice.DISTANCE_PRICE_01 : MilkPrice.DISTANCE_PRICE_01;      
    }

    return 0;
  }

  static getMilkBonusPrice(producedAmount, month) {
    if (month >= 5 && month <= 11 && producedAmount > 10000) {
      return MilkPrice.BONUS;  
    }

    return 0;
  }

  static getMilkPrice(initialAmount, month, distance) {
    const basePrice = this.getMilkBasePrice(month);
    const distancePrice = this.getMilkDistancePrice(distance, month);
    const bonusProductionPrice = this.getMilkBonusPrice(initialAmount, month);
    const milkPricePerLiter = (initialAmount * basePrice) - (distancePrice * distance) + bonusProductionPrice;
    
    // transform price from cents to whole price
    const wholePrice = milkPricePerLiter / 10 ** 2;

    const formattedPriceBr = wholePrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    const formattedPriceEn = (wholePrice / TEMP_DOLAR).toLocaleString('en',{style: 'currency', currency: 'USD'});

    return {month, price_br: formattedPriceBr, price_en: formattedPriceEn};
  }
}

export default MilkPriceUtils;