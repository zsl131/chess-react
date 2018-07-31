import * as CryptoJS from 'crypto-js';

let AuthTokenKey = "1234567890147258"; //AES密钥
let AuthTokenIv = '1234567890147258'; //AES向量

/*AES加密*/
export function encrypt(data) {
  let dataStr = JSON.stringify(data);
  let encrypted = CryptoJS.AES.encrypt(dataStr, CryptoJS.enc.Latin1.parse(AuthTokenKey), {
    iv: CryptoJS.enc.Latin1.parse(AuthTokenIv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

var toBinaryTable = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
];

var toBase64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
var base64Pad = '=';

function base64ToString(data) {
  var result = '';
  var leftbits = 0; // number of bits decoded, but yet to be appended
  var leftdata = 0; // bits decoded, but yet to be appended
  // Convert one by one.
  for (var i = 0; i < data.length; i++) {
    var c = toBinaryTable[data.charCodeAt(i) & 0x7f];
    var padding = (data.charCodeAt(i) == base64Pad.charCodeAt(0));
    // Skip illegal characters and whitespace
    if (c == -1) continue;
    // Collect data into leftdata, update bitcount
    leftdata = (leftdata << 6) | c;
    leftbits += 6;
    // If we have 8 or more bits, append 8 bits to the result
    if (leftbits >= 8) {
      leftbits -= 8;
      // Append if not padding.
      if (!padding)
        result += String.fromCharCode((leftdata >> leftbits) & 0xff);
      leftdata &= (1 << leftbits) - 1;
    }
  }
  // If there are any bits left, the base64 string was corrupted
  // if (leftbits)
  //   throw Components.Exception('Corrupted base64 string');
  return result;
}


export function toBase64(str) {
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var i = 0,
    len = str.length,
    string = '';

  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt((c1 & 0x3) << 4);
      string += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      string += base64EncodeChars.charAt((c2 & 0xF) << 2);
      string += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    string += base64EncodeChars.charAt(c1 >> 2);
    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    string += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return string
}
