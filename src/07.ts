import { readInput } from "./helpers/read-input";

const input = readInput();

type Equation = {
  testValue: number;
  calibrationEquation: number[];
};

const parse = (input: string): Equation[] => {
  return input.split("\n").map((line) => {
    const [testValue, equation] = line.split(": ");

    return {
      testValue: parseInt(testValue),
      calibrationEquation: equation.split(" ").map((num) => parseInt(num)),
    };
  });
};

const equations: Equation[] = parse(input);

const computePossibilitiesPartOne = (
  equation: Equation,
  { value, idx, results }: { value: number; idx: number; results: number[] },
): number[] => {
  const nextValue = equation.calibrationEquation[idx];

  if (nextValue) {
    results.push(value * nextValue);
    results.push(value + nextValue);

    return results.concat(
      computePossibilitiesPartOne(equation, {
        value: value * nextValue,
        idx: idx + 1,
        results: results,
      }),
      computePossibilitiesPartOne(equation, {
        value: value + nextValue,
        idx: idx + 1,
        results: results,
      }),
    );
  } else {
    return results;
  }
};

const possiblyTruePartOne = (equation: Equation): boolean => {
  const allResults = computePossibilitiesPartOne(equation, {
    value: equation.calibrationEquation[0],
    idx: 1,
    results: [],
  });

  return allResults.includes(equation.testValue);
};

console.log(
  "Problem one:",
  equations
    .filter((equation) => possiblyTruePartOne(equation))
    .map((equation) => equation.testValue)
    .reduce((sum, num) => sum + num, 0),
);
