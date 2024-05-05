const fs = require('fs')
const path = require('path')
const { Buffer } = require('node:buffer');




const encode = async () => {
}

const decode = async () => {
  console.log(path.resolve(__dirname, '150.uint64'))
  // const output = new Buffer(await fs.readFileSync(path.resolve(__dirname, '150.uint64', "binary")));
  // const one = await fs.readFileSync(path.resolve(__dirname, '1.uint64'));
  const onefifty = await fs.readFileSync(path.resolve(__dirname, '150.uint64'));
  // const oneBuf = Buffer.from(one);
  // const onefiftyBuf= Buffer.from(onefifty);
  // const buf2 = Buffer.from(output, 'hex');

  // console.log("oneBuf: ", oneBuf)
  // console.log("onefiftyBuf: ", onefiftyBuf)

  // console.log("oneBuf length: ", oneBuf.length)
  // console.log("onefiftyBuf length: ", onefiftyBuf.length)

  // console.log("oneBufBE: ", oneBuf.readBigUInt64BE(0))
  // console.log("onefiftyBufBE: ", onefiftyBuf.readBigUInt64BE(0))


  // for (var i = 0; i < onefiftyBuf.length; i++) {
  //   console.log("buf iteration ", typeof onefiftyBuf[i])
  //   console.log("buf iteration ", onefiftyBuf[i].toString())
  //   console.log("buf iteration ", onefiftyBuf[i].toString("hex"))
  // }

  console.log("onefifty", Buffer.isEncoding(onefifty))
  console.log("string?", onefifty.toString("hex"))
  const hexString = onefifty.toString("hex");
  let bytes = "";
  for (var i = 0; i < hexString.length; i++) {
    console.log(hexString[i])
    console.log(hex2bin(hexString[i]))
    bytes += hex2bin(hexString[i]);
  }
  console.log("das bytes", bytes)

  //for (var i = 0; i < onefifty.length; i++) {
  //  // console.log("iteration ", typeof onefifty[i])
  //  // console.log("iteration ", onefifty[i].toString())
  //     // Extract two characters at a time (one byte)
  //  const hexValue = onefifty.slice(i, i + 2);

  //  // console.log("typeof hex", typeof hexValue)
  //  //
  //  // Print out the hexadecimal value
  //  console.log("hex value", hexValue);

  //}

  // console.log("oneBufLE: ", oneBuf.readBigUInt64LE(0))
  // console.log("onefiftyBufLE: ", onefiftyBuf.readBigUInt64LE(0))
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
