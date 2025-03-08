import crypto from "crypto";

// Ensure the key is exactly 32 bytes (256 bits)
const SECRET_KEY = crypto.createHash("sha256").update("mySecretKey123456").digest("base64").substr(0, 32);

// Ensure the IV is exactly 16 bytes
const IV = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), IV);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return { iv: IV.toString("hex"), encryptedData: encrypted };
};

const decrypt = (encryptedText, iv) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encryptedText, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};

// Example usage:
const encrypted = encrypt("Alice Johnson");
console.log("Encrypted:", encrypted);

const decrypted = decrypt(encrypted.encryptedData, encrypted.iv);
console.log("Decrypted:", decrypted);
