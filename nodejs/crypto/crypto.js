const crypto = require("crypto");
const aes256gcm = (key, encoding) => {
  const encrypt = (plaintext) => {
    // initialization vector
    const iv = new crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    let enc_utf = cipher.update(plaintext, "utf8");
    let enc_buf = cipher.final();
    let auth_tag = cipher.getAuthTag();

    let result = Buffer.concat([enc_utf, enc_buf, iv, auth_tag]).toString(
      encoding,
    );
    return { result, iv: iv.toString(encoding) };
    /*
    let result_without_iv = Buffer.concat([
      enc_utf,
      enc_buf,
      auth_tag,
    ]).toString(encoding);
    console.log("[DEBUG] iv encoded lenth: ", iv.toString(encoding).length);
    return { result, result_without_iv, iv: iv.toString(encoding) };
    */
  };

  const decrypt = (enciphered) => {
    let enc = Buffer.from(enciphered, encoding);
    console.log("[DEBUG] enc: ", enc);
    console.log("[DEBUG] enc length: ", enc.length);

    const iv = enc.subarray(enc.length - 28, enc.length - 16);
    const auth_tag = enc.subarray(enc.length - 16);
    const enc_data = enc.subarray(0, enc.length - 28);

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(auth_tag);

    let rslt = decipher.update(enc_data, null, "utf8");
    rslt += decipher.final("utf8");
    return rslt;
  };

  return {
    encrypt,
    decrypt,
  };
};

// encryption
const cipher = aes256gcm("abcdefghijklmnopqrstuvwxyz123456", "hex");
//const cipher = aes256gcm("abcdefghijklmnopqrstuvwxyz123456", "base64");
const rslt = cipher.encrypt("Rust rocks !");
//const rslt = cipher.encrypt("Rust rocks, the rustaceans as well !");

console.log("iv: ", rslt.iv);
console.log("encrypted      : ", rslt.result);
//console.log("encrypted no iv: ", rslt.result_without_iv);

// decryption
const plaintext = cipher.decrypt(rslt.result);
console.log("decrypted : ", plaintext);
