const fs = require('fs')
const path = require('path')
const { Buffer } = require('node:buffer');


let hexBuilder = '';
const buildHex = (number) => {
  const quotient = Math.floor(number / 16);
  const remainder = number % 16;
  const v = num2hex(remainder);

  hexBuilder = v + hexBuilder;

  if (1 > quotient) {
    return hexBuilder;
  } else {
    return buildHex(quotient);
  }
}


const encode = (number) => {

  const fullHex = buildHex(number);
  // let binary = '';
  // fullHex.split('').forEach(h => {
  //   const bin = (Number(hex2number(h)) >>> 0).toString(2)
  //   binary += (Number(hex2number(h)) >>> 0).toString(2);
  // })

  // console.log(binary)

  return fullHex
}

const decode = async () => {
  const calculateTrackingPosition = (tracker) => {
    return (8 * tracker) - 1;
  }

  const calculateDecimal = (number, power) => {
    const n = Number(number);
    return n * 16 ** power;
  }

  const calculatePower = (length, i) => {
    return (length - 1) - i;
  }

  const encoded = await fs.readFileSync(path.resolve(__dirname, 'maxint.uint64'));

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
  // await decode();
  const coded = encode(150);
  console.log(coded);
})()

function num2hex(num){
  var out = "";
  switch(num) {
    case 0: out += '0'; break;
    case 1: out += '1'; break;
    case 2: out += '2'; break;
    case 3: out += '3'; break;
    case 4: out += '4'; break;
    case 5: out += '5'; break;
    case 6: out += '6'; break;
    case 7: out += '7'; break;
    case 8: out += '8'; break;
    case 9: out += '9'; break;
    case 10:out += 'a'; break;
    case 11:out += 'b'; break;
    case 12:out += 'c'; break;
    case 13:out += 'd'; break;
    case 14:out += 'e'; break;
    case 15:out += 'f'; break;
    default: return "";
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
