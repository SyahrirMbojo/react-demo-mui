import CryptoJS from "crypto-js";

const secretKey = "s3cr3tk3y";

function randomChar(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// encode use base64
function encodeChar(val) {
  let btoaString = btoa(val);
  let encodeString = randomChar(20) + btoaString;
  return encodeString;
}

// decode use base64
function decodeChar(val) {
  let plaintext = val.substring(20);
  let decodeString = atob(plaintext);
  return decodeString;
}

function encryptKey(val) {
  let ciphertext = CryptoJS.HmacSHA512(val, secretKey);
  return ciphertext;
}

function encryptChar(val) {
  let ciphertext = CryptoJS.AES.encrypt(val, secretKey).toString();
  let encode = randomChar(30) + ciphertext;
  return encode;
}

function decryptChar(val) {
  let ciphertext = val.substring(30);
  let bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  let decode = bytes.toString(CryptoJS.enc.Utf8);
  return decode;
}

function setSession(key, value) {
  // let encodeString = encodeChar(value);
  let encodeString = encryptChar(value);
  let encodekey = encryptKey(key);
  localStorage.setItem(encodekey, encodeString);
}

function getSession(key) {
  let encodekey = encryptKey(key);
  let plaintext = localStorage.getItem(encodekey);
  // let decodeString = decodeChar(plaintext);
  let decodeString = plaintext && decryptChar(plaintext);
  return decodeString;
}

const UseParam = {
  setName(val) {
    setSession("name", val);
  },

  getName() {
    return getSession("name");
  },

  setToken(val) {
    setSession("token", val);
  },

  getToken() {
    return getSession("token");
  },

  setIslogin(val) {
    setSession("islogin", val);
  },

  getIslogin() {
    return getSession("islogin");
  },

  clearSession() {
    localStorage.clear();
  },
};

export { UseParam };
