import { readFile, writeFile, rename, copyFile, rm } from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { resolve } from "path";

export async function handleFileOperations(command, args) {
  const [filePath, destPath] = args.map((arg) => resolve(process.cwd(), arg));

  switch (command) {
    case "cat":
      const content = await readFile(filePath, "utf8");
      console.log(content);
      break;
    case "add":
      await writeFile(filePath, "");
      break;
    case "rn":
      await rename(filePath, destPath);
      break;
    case "cp":
      await pipeline(createReadStream(filePath), createWriteStream(destPath));
      break;
    case "mv":
      await pipeline(createReadStream(filePath), createWriteStream(destPath));
      await rm(filePath);
      break;
    case "rm":
      await rm(filePath);
      break;
  }
}
