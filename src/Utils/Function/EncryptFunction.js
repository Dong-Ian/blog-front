import CryptoJS from "crypto-js";

export default function EncryptFunction({ data }) {
  // AES 키와 IV를 UTF-8 형식으로 파싱
  let key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_KEY); // AES값 할당
  let iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_IV); // IV값 할당

  let encrypt = CryptoJS.AES.encrypt(data, key, { iv: iv });

  return encrypt.toString();
}
