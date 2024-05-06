const fs = require('fs')
const path = require('path')
const { Buffer } = require('node:buffer');




const encode = async () => {
}

const decode = async () => {
  const calculateTrackingPosition = (tracker) => {
    return (8 * tracker) - 1;
  }

  const calculateDecimal = (number, power) => {
    const n = Number(number);
    return n * (16 ** power);
  }

  const calculatePower = (length, i) => {
    return (length - 1) - i;
  }

  console.log(path.resolve(__dirname, '150.uint64'))
  const encoded = await fs.readFileSync(path.resolve(__dirname, '150.uint64'));

  const hexString = encoded.toString("hex");
  let decimal = []
  let hexLength = hexString.length;

  let bitProgression = 15;

  let passes = 1;
  const hexNumeArr = []
  console.log("bits", hexLength)
  console.log("hexString", hexString)
  for (var i = 0; i < hexLength; i++) {
    decimal.push(calculateDecimal(hex2number(hexString[i]), calculatePower(hexLength, i)));
  }

  console.log("decimal", decimal)
  console.log("sum", decimal.reduce((a, b) => a + b, 0))
}

(async () => {
  await decode();
})()

function hex2bin(hex){
    hex = hex.replace("0x", "").toLowerCase();
    var out = "";
    for(var c of hex) {
        switch(c) {
            case '0': out += "0000"; break;
            case '1': out += "0001"; break;
            case '2': out += "0010"; break;
            case '3': out += "0011"; break;
            case '4': out += "0100"; break;
            case '5': out += "0101"; break;
            case '6': out += "0110"; break;
            case '7': out += "0111"; break;
            case '8': out += "1000"; break;
            case '9': out += "1001"; break;
            case 'a': out += "1010"; break;
            case 'b': out += "1011"; break;
            case 'c': out += "1100"; break;
            case 'd': out += "1101"; break;
            case 'e': out += "1110"; break;
            case 'f': out += "1111"; break;
            default: return "";
        }
    }

    return out;
}

function hex2num(hex){
    hex = hex.replace("0x", "").toLowerCase();
    var out = "";
    for(var c of hex) {
        switch(c) {
            case '0': out += 0; break;
            case '1': out += 1; break;
            case '2': out += 2; break;
            case '3': out += 3; break;
            case '4': out += 4; break;
            case '5': out += 5; break;
            case '6': out += 6; break;
            case '7': out += 7; break;
            case '8': out += 8; break;
            case '9': out += 9; break;
            case 'a': out += 10; break;
            case 'b': out += 11; break;
            case 'c': out += 12; break;
            case 'd': out += 13; break;
            case 'e': out += 14; break;
            case 'f': out += 15; break;
            default: return "";
        }
    }

    return out;
}

function hex2number(hex){
    hex = hex.replace("0x", "").toLowerCase();
    var out = "";
    for(var c of hex) {
        switch(c) {
            case '0': out += 0; break;
            case '1': out += 1; break;
            case '2': out += 2; break;
            case '3': out += 3; break;
            case '4': out += 4; break;
            case '5': out += 5; break;
            case '6': out += 6; break;
            case '7': out += 7; break;
            case '8': out += 8; break;
            case '9': out += 9; break;
            case 'a': out += 10; break;
            case 'b': out += 11; break;
            case 'c': out += 12; break;
            case 'd': out += 13; break;
            case 'e': out += 14; break;
            case 'f': out += 15; break;
            default: return "";
        }
    }

    return Number(out);
}
