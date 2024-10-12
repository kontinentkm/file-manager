import { resolve } from "path";
import { readdir } from "fs/promises";
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

        console.log(
          `\n${"Index".padEnd(10)} | ${"Name".padEnd(30)} | ${"Type".padEnd(
            15
          )}`
        );
        console.log("-".repeat(60));

        files
          .sort(
            (a, b) =>
              a.isDirectory() - b.isDirectory() || a.name.localeCompare(b.name)
          )
          .forEach((file, i) => {
            const type = file.isDirectory() ? "directory" : "file";
            console.log(
              `${String(i).padEnd(10)} | ${file.name.padEnd(
                30
              )} | ${type.padEnd(15)}`
            );
          });

        console.log();

        break;
    }
  } catch (error) {
    handleError(error);
  }
}
