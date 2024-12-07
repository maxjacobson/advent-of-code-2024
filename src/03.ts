import { readInput } from "./helpers/read-input";

const input = readInput();

type Instruction =
  | {
      name: "mul";
      arguments: [number, number];
    }
  | {
      name: "do";
    }
  | {
      name: "don't";
    };

const parseInstructions = (input: string): Instruction[] => {
  const instructions = [];

  for (const match of input.matchAll(
    /(?:(mul)\((\d{1,3}),(\d{1,3})\))|(?:(do)\(\))|(?:(don't)\(\))/g,
  )) {
    if (match[1] === "mul") {
      instructions.push({
        name: "mul",
        arguments: [parseInt(match[2]), parseInt(match[3])],
      });
    } else if (match[4] === "do") {
      instructions.push({ name: "do" });
    } else if (match[5] === "don't") {
      instructions.push({ name: "don't" });
    } else {
      throw new Error(`Weird match ${match}`);
    }
  }
  return instructions;
};

const sumOfInstructionResults = (instructions: Instruction[]): number => {
  let result = 0;
  let doMultiply = true;

  instructions.forEach((instruction) => {
    if (instruction.name === "mul" && doMultiply) {
      result += instruction.arguments[0] * instruction.arguments[1];
    } else if (instruction.name === "don't") {
      doMultiply = false;
    } else if (instruction.name === "do") {
      doMultiply = true;
    }
  });

  return result;
};

const instructions: Instruction[] = parseInstructions(input);

console.log(
  "Part one:",
  sumOfInstructionResults(
    instructions.filter((instruction) => instruction.name === "mul"),
  ),
);
console.log("Part two:", sumOfInstructionResults(instructions));
