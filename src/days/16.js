/* eslint-disable no-use-before-define */
const data = `020D78804D397973DB5B934D9280CC9F43080286957D9F60923592619D3230047C0109763976295356007365B37539ADE687F333EA8469200B666F5DC84E80232FC2C91B8490041332EB4006C4759775933530052C0119FAA7CB6ED57B9BBFBDC153004B0024299B490E537AFE3DA069EC507800370980F96F924A4F1E0495F691259198031C95AEF587B85B254F49C27AA2640082490F4B0F9802B2CFDA0094D5FB5D626E32B16D300565398DC6AFF600A080371BA12C1900042A37C398490F67BDDB131802928F5A009080351DA1FC441006A3C46C82020084FC1BE07CEA298029A008CCF08E5ED4689FD73BAA4510C009981C20056E2E4FAACA36000A10600D45A8750CC8010989716A299002171E634439200B47001009C749C7591BD7D0431002A4A73029866200F1277D7D8570043123A976AD72FFBD9CC80501A00AE677F5A43D8DB54D5FDECB7C8DEB0C77F8683005FC0109FCE7C89252E72693370545007A29C5B832E017CFF3E6B262126E7298FA1CC4A072E0054F5FBECC06671FE7D2C802359B56A0040245924585400F40313580B9B10031C00A500354009100300081D50028C00C1002C005BA300204008200FB50033F70028001FE60053A7E93957E1D09940209B7195A56BCC75AE7F18D46E273882402CCD006A600084C1D8ED0E8401D8A90BE12CCF2F4C4ADA602013BC401B8C11360880021B1361E4511007609C7B8CA8002DC32200F3AC01698EE2FF8A2C95B42F2DBAEB48A401BC5802737F8460C537F8460CF3D953100625C5A7D766E9CB7A39D8820082F29A9C9C244D6529C589F8C693EA5CD0218043382126492AD732924022CE006AE200DC248471D00010986D17A3547F200CA340149EDC4F67B71399BAEF2A64024B78028200FC778311CC40188AF0DA194CF743CC014E4D5A5AFBB4A4F30C9AC435004E662BB3EF0`;

const binaryChars = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
};
const binaryValues = Object.keys(binaryChars).reduce((acc, char) => ({ ...acc, [binaryChars[char]]: char }), {});
const binListToVal = (list) => parseInt(list.join(''), 2);
const hexListToVal = (list) => parseInt(list.join(''), 16);

// 1st 3 bits: version
// 2nd 3 bits: type ID
//
// numbers are binary w/ most significant bit first
//
// types: {
//   4: literal
//     encodes a single binary number, padding w/ zero until a multiple of 4, then
//       breaking into groups of 3 bits, prefixing each but the last with a `1` bit,
//       and prefixing the last with a `0` bit.
//  }
//
// all types !== 4 are `operator` packets.
// char after header is `length type ID`
//   if 0: next 15 bits are number, total length in bits of subpackets contained
//   if 1, next 11 bits are number, number of sub-packets contained.
//
//
// D2FE28
// 1101 0010 1111 1110 0010 1000
// 110100101111111000101000
// 110 100  101111111000101000
// 110 100  10111 11110 00101 000
// 110 100  10111 11110 00101
// 110 100  0111 1110 0101
// v6, t4: 7E5
// 2021
//
// 38006F45291200
// 0011 1000 0000 0000 0110 1111 0100 0101 0010 1001 0001 0010 0000 0000
// 00111000000000000110111101000101001010010001001000000000
// 001 110 0 000000000011011 1101000101001010010001001000000000
// 1 6 0 27 [ 110 100 01010 ] [ 010 100 10001 00100 ] 0000000
// 1 6 0 27 [ 6 4 1010 ] [ 2 4 0001 0100 ] 0000000
// 1 6 0 27 [ 6 4 'A' ] [ 2 4 '14' ] 0000000
//
// EE00D40C823060
// 1110 1110 0000 0000 1101 0100 0000 1100 1000 0010 0011 0000 0110 0000
// 11101110000000001101010000001100100000100011000001100000
// 111 011 1 00000000011 [ 010 100 00001 ] [ 100 100 00010 ] [ 001 100 00011 ] 00000
// 7 3 1 3 [2 4 1] [4 4 2] [1 4 3]
// 7 3 1 3 '123'
//
// 01100010000000001000000000000000000101100001000101010110001011001000100000000010000100011000111000110100
// 011 000 1 00000000010 
//   [000 000 0 000000000010110 [000 100 01010][101 100 01011]]
//   [001 000 1 00000000010 [000 100 01100][011 100 01101] 00
//
// 1100000000000001010100000000000000000001011000010001010110100010111000001000000000101111000110000010001101000000
// 6 0 0 000000001010100
//   0 0 0 000000000010110
//     [0 4 01010] [6 4 01011]
// 4 0 1 00000000010 [7 4 01100] [0 4 01101]
//

const keys = {
  SUM: 0,
  PROD: 1,
  MIN: 2,
  MAX: 3,
  LITERAL: 4,
  GT: 5,
  LT: 6,
  EQ: 7,
};

let versionSum = 0;

const valMappers = {
  [keys.SUM]: (vals) => vals.reduce((acc, val) => acc + val, 0),
  [keys.PROD]: (vals) => vals.reduce((acc, val) => acc * val, 1),
  [keys.MIN]: (vals) => Math.min(...vals),
  [keys.MAX]: (vals) => Math.max(...vals),
  [keys.GT]: (vals) => (vals[0] > vals[1] ? 1 : 0),
  [keys.LT]: (vals) => (vals[0] < vals[1] ? 1 : 0),
  [keys.EQ]: (vals) => (vals[0] === vals[1] ? 1 : 0),
};

class Packet {
  type0Offset = 15;

  type1Offset = 11;

  constructor(binRow) {
    this.binRow = binRow;
    this.version = binListToVal(binRow.slice(0, 3));
    this.type = binListToVal(binRow.slice(3, 6));
    this.content = binRow.slice(6);
    this.val = null;
    this.len = null;
    this.hex = null;
    this.packets = [];
    versionSum += this.version;

    if (this.type === keys.LITERAL) { this.loadLiteral(); } else { this.loadOperator(); }
  }

  get packetVals() {
    return this.packets.map(packet => packet.val);
  }

  loadLiteral = () => {
    let doneSearch = false;
    let index = 0;
    const chars = [];
    while (!doneSearch) {
      const newSlice = this.content.slice(index + 1, index + 5);
      chars.push(binaryValues[newSlice.join('')]);
      if (this.content[index] === '0') { doneSearch = true; }
      index += 5;
      if (!newSlice) {
        break;
      }
    }
    this.hex = chars;
    this.val = hexListToVal(chars);
    this.len = index + 6;
  };

  loadType1 = () => {
    const num = binListToVal(this.content.slice(0, this.type1Offset));
    this.content = this.content.slice(this.type1Offset);
    let len = 7 + this.type1Offset;
    for (let i = 0; i < num; i++) {
      if (!this.content.length) { break; }
      const packet = new Packet(this.content);
      this.packets.push(packet);
      this.content = this.content.slice(packet.len);
      len += packet.len;
    }
    this.len = len;
  }

  loadType0 = () => {
    const contentLen = binListToVal(this.content.slice(0, this.type0Offset));
    this.content = this.content.slice(this.type0Offset, this.type0Offset + contentLen);
    let foundLen = 0;
    while (foundLen < contentLen && this.content.length) {
      const packet = new Packet(this.content);
      foundLen += packet.len;
      this.content = this.content.slice(packet.len);
      this.packets.push(packet);
    }
    this.len = 7 + this.type0Offset + contentLen;
  }

  loadOperator = () => {
    this.lenType = this.content.shift();
    if (this.lenType === '0') { this.loadType0(); } else { this.loadType1(); }
    this.val = valMappers[this.type](this.packetVals);
  }
}

const parseRow = (row) => {
  versionSum = 0;
  const binRow = row.split('').map(char => binaryChars[char]).join('').split('');
  const packet = new Packet(binRow);
  return { row, packet, versionSum };
};

const loadVersionSum = (str) => parseRow(str).versionSum;
const loadVal = (str) => parseRow(str).packet.val;

export default {
  loadTest: () => loadVersionSum('D2FE28'),
  loadData: () => loadVersionSum(data),
  loadTest12Data: () => loadVersionSum('620080001611562C8802118E34'),
  loadTest16Data: () => loadVersionSum('8A004A801A8002F478'),
  loadTest23Data: () => loadVersionSum('C0015000016115A2E0802F182340'),
  loadTest31Data: () => loadVersionSum('A0016C880162017C3686B18A3D4780'),
  loadTest3Sum: () => loadVal('C200B40A82'),
  loadDataSum: () => loadVal(data),
};
