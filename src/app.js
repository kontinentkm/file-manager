import readline from "readline";
import { handleCommand } from "./commands/nwd.js";
import { handleFileOperations } from "./commands/fileOperations.js";
import { handleOSInfo } from "./commands/osInfo.js";
import { calculateHash } from "./commands/hash.js";
import { handleCompression } from "./commands/compress.js";
import { printMessage, printCurrentDirectory } from "./utils/printer.js";

const username = process.env.npm_config_username || "User";

printMessage(`Welcome to the File Manager, ${username}!`);
printCurrentDirectory(process.cwd());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", async (input) => {
  const [command, ...args] = input.trim().split(" ");

  try {
    switch (command) {
      case "up":
      case "cd":
      case "ls":
        await handleCommand(command, args);
        break;
      case "cat":
      case "add":
      case "rn":
      case "cp":
      case "mv":
      case "rm":
        await handleFileOperations(command, args);
        break;
      case "os":
        await handleOSInfo(args);
        break;
      case "hash":
        await calculateHash(args[0]);
        break;
      case "compress":
      case "decompress":
        await handleCompression(command, args);
        break;
      case ".exit":
        rl.close();
        break;
      default:
        printMessage("Invalid input");
    }
  } catch (error) {
    handleError(error);
  }

  printCurrentDirectory(process.cwd());
});

rl.on("close", () => {
  printMessage(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
