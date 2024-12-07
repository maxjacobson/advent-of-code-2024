import { readInput } from "./helpers/read-input";

const input = readInput();

const parseAsLists = (input: string): { left: number[]; right: number[] } => {
  const left = [];
  const right = [];

  input.split("\n").forEach((line: string) => {
    const [a, b] = line.split(/\s+/);
    left.push(parseInt(a));
    right.push(parseInt(b));
  });

  return {
    left: left,
    right: right,
  };
};

const sortedPairs = (a: number[], b: number[]) => {
  const pairs = [];

  a.sort();
  b.sort();

  for (let i = 0; i < a.length; i++) {
    pairs.push([a[i], b[i]]);
  }

  return pairs;
};
const distance = (a: number, b: number): number => {
  return Math.abs(a - b);
};
const sumOfDistances = (pairs) => {
  let sum = 0;

  pairs.forEach((pair: [number, number]) => {
    sum += distance(...pair);
  });

  return sum;
};
const similarityScore = (left: number[], right: number[]): number => {
  let score = 0;

  left.forEach((leftNum) => {
    right.forEach((rightNum) => {
      if (leftNum === rightNum) {
        score += leftNum;
      }
    });
  });

  return score;
};

const { left, right } = parseAsLists(input);

console.log("Part one:", sumOfDistances(sortedPairs(left, right)));
console.log("Part two:", similarityScore(left, right));
