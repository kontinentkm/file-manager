import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";

export async function handleCompression(command, [filePath, destPath]) {
  const source = createReadStream(filePath);
  const destination = createWriteStream(destPath);
  if (command === "compress") {
    await pipeline(source, createBrotliCompress(), destination);
  } else if (command === "decompress") {
    await pipeline(source, createBrotliDecompress(), destination);
  }
}
