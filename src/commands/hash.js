import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { handleError } from "../utils/errorHandler.js";

export async function calculateHash(filePath) {
  try {
    const fileBuffer = await readFile(filePath);
    const hashSum = createHash("sha256");
    hashSum.update(fileBuffer);
    console.log(hashSum.digest("hex"));
  } catch (error) {
    handleError(error);
  }
}
