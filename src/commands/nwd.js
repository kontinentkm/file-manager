import { resolve } from "path";
import { readdir } from "fs/promises";
import { printMessage } from "../utils/printer.js";
import { handleError } from "../utils/errorHandler.js";

export async function handleCommand(command, args) {
  try {
    switch (command) {
      case "up":
        process.chdir("..");
        break;
      case "cd":
        const newPath = resolve(process.cwd(), args[0]);
        process.chdir(newPath);
        break;
      case "ls":
        const files = await readdir(process.cwd(), { withFileTypes: true });
        files
          .sort(
            (a, b) =>
              a.isDirectory() - b.isDirectory() || a.name.localeCompare(b.name)
          )
          .forEach((file, i) => {
            console.log(
              `${i} | ${file.name} | ${
                file.isDirectory() ? "directory" : "file"
              }`
            );
          });
        break;
    }
  } catch (error) {
    handleError(error);
  }
}
