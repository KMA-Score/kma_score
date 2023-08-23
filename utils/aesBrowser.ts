export async function encryptWithAesCbcBrowser(
  text: string,
  key: ArrayBuffer,
): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const algorithm = { name: "AES-CBC", iv };
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    algorithm,
    false,
    ["encrypt"],
  );

  const encoded = new TextEncoder().encode(text);
  const encrypted = await crypto.subtle.encrypt(algorithm, cryptoKey, encoded);

  const encryptedArray = new Uint8Array(encrypted);
  const encryptedHex = Array.from(encryptedArray)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${encryptedHex}.${ivHex}`;
}
