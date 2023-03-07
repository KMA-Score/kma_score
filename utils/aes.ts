import crypto from "crypto";

export function encryptWithAesCbc(text: string, key: Buffer) {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let ciphertext = cipher.update(text, "utf8", "hex");

  // const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
  //
  // return finalBuffer.toString("hex") + "." + iv.toString("hex");

  ciphertext += cipher.final("hex");

  return `${ciphertext}.${iv.toString("hex")}`;
}
