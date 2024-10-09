import os from "os";

export function handleOSInfo(args) {
  const option = args[0];
  switch (option) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--cpus":
      console.log(os.cpus());
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(os.arch());
      break;
  }
}
