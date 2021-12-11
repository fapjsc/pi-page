const denominationTable = {
  "0x00": null,
  "0x01": 1,
  "0x02": 5,
  "0x03": 10,
  "0x04": 25,
  "0x05": 50,
  "0x06": 100,
  "0x07": 500,
  "0x08": 1000,
  "0x09": 2000,
  "0x0A": 10000,
  "0x0B": 20,
  "0x0C": 200,
  "0x0D": 250,
  "0x0E": 2500,
  "0x0F": 5000,
  '0x10': 20000,
  '0x11': 25000,
  '0x12': 50000,
  '0x13': 100000,
  '0x14': 200000,
  '0x15': 250000,
  '0x16': 500000,
  '0x17': 2,
  '0x18': 3,
  '0x19': 15,
  "0x1A": 40,
  "0x1B": 0.5,
  "0x1C": 0.25,
  "0x1D": 0.2,
  "0x1E": 0.1,
  "0x1F": 0.05,
  '0x20': null,
  '0x21': -1,
  '0x22': -5,
  '0x23': -10,
  '0x24': -25,
  '0x25': -50,
  '0x26': -100,
  '0x27': -500,
  '0x28': -1000,
  '0x29': -2000,
  "0x2A": -10000,
  "0x2B": -20,
  "0x2C": -200,
  "0x2D": -250,
  "0x2E": -2500,
  "0x2F": -5000,
  '0x30': -20000,
  '0x31': -25000,
  '0x32': -50000,
  '0x33': -100000,
  '0x34': -200000,
  '0x35': -250000,
  '0x36': -500000,
  '0x37': -2,
  '0x38': -3,
  '0x39': -15,
  "0x3A": -40,
  "0x3B": -0.5,
  "0x3C": -0.25,
  "0x3D": -0.2,
  "0x3E": -0.1,
  "0x3F": -0.05,
};

export const getDenominationTable = (code) => {
  // if (denominationTable[code]) {
  //   return denominationTable[code];
  // }

  return denominationTable[code];
};

export const getDenomination = (value, code) => {
  if (denominationTable[code]) {
    return (value * denominationTable[code]) / 100;
  }

  return value;
};
