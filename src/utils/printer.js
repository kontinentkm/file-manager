import { resolve } from "path";

export function printMessage(message) {
  console.log(message);
}

export function printCurrentDirectory(directory) {
  console.log(`You are currently in ${resolve(directory)}`);
}
