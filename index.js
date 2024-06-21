// "Write a program that can encode 64-bit unsigned integers
// into the Protocol Buffers varint encoding."

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

  const binString = fullHex.split(',').reduce((binary, h) => {

    binary += hex2bin(h);
    return binary
  }, "")

  console.log(binString)
  if (binString[0] === '1') {
    return fullHex + "01";
  } else {
    return "0" + fullHex
  }
}

const decode = (encoded) => {

  const calculateDecimal = (number, power) => {
    const powerOfSixteen = BigInt(16);
    const n = BigInt(number);
    const p = BigInt(power);


    const powered = BigInt(powerOfSixteen ** p);
    const product = BigInt(n * powered)
    return product;
  }

  const hexString = encoded.toString("hex");
  let decimal = []
  let hexLength = hexString.length;
  let highestPower = hexLength - 1;
  for (var i = 0; i < hexLength; i++) {
    decimal.push(calculateDecimal(hex2number(hexString[i]), highestPower - i));
  }

  const sum = decimal.reduce((a, b) => BigInt(a) + BigInt(b), 0);

  console.log("sum", sum.toString())

  return sum;
}

(async () => {
  // encode(150) == b'\x96\x01'
  // decode(b'\x96\x01') == 150

  const encoded = await fs.readFileSync(path.resolve(__dirname, 'maxint.uint64'));

  decode(encoded);
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
