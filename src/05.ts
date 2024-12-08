import { sum } from "./helpers/math";
import { readInput } from "./helpers/read-input";

const input = readInput();

type Rule = [number, number];
type Update = number[];

const parseRules = (input: string): Rule[] => {
  return input.split("\n").map((line) => {
    const [a, b] = line.split("|").map((num) => parseInt(num));

    return [a, b];
  });
};

const parseUpdates = (input: string): Update[] => {
  return input.split("\n").map((line) => {
    return line.split(",").map((num) => parseInt(num));
  });
};

const parse = (input: string): [Rule[], Update[]] => {
  const [rules, updates] = input.split("\n\n");
  return [parseRules(rules), parseUpdates(updates)];
};

const [rules, updates] = parse(input);

const middlePage = (update: Update): number => {
  return update[Math.floor(update.length / 2)];
};

const middlePages = (updates: Update[]): number[] => {
  return updates.map(middlePage);
};

const isCorrectlyOrdered = (rules: Rule[], update: Update): boolean => {
  for (const [a, b] of rules) {
    const indexOfA = update.indexOf(a);
    const indexOfB = update.indexOf(b);
    if (indexOfA > -1 && indexOfB > -1) {
      if (indexOfB < indexOfA) {
        return false;
      }
    }
  }

  return true;
};

console.log(
  "Problem one:",
  sum(
    middlePages(updates.filter((update) => isCorrectlyOrdered(rules, update))),
  ),
);
