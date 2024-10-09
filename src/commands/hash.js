import { createHash } from "crypto";
import { readFile } from "fs/promises";

export async function calculateHash(filePath) {
  const fileBuffer = await readFile(filePath);
  const hashSum = createHash("sha256");
  hashSum.update(fileBuffer);
  console.log(hashSum.digest("hex"));
}
