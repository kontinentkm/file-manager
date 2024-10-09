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
