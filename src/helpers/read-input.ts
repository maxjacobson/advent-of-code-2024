import * as fs from "node:fs";
import { argv } from "node:process";

export const readInput = (): string => {
  return fs.readFileSync(argv.at(2)).toString().trim();
};
