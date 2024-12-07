import { readInput } from "./helpers/read-input";

const input = readInput();

type Instruction = {
  name: "mul";
  arguments: [number, number];
};

const parseInstructions = (input: string): Instruction[] => {
  const instructions = [];

  for (const match of input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)) {
    instructions.push({
      name: "mul",
      arguments: [parseInt(match[1]), parseInt(match[2])],
    });
  }
  return instructions;
};

const evaluate = (instruction: Instruction): number => {
  return instruction.arguments[0] * instruction.arguments[1];
};

const sumOfInstructionResults = (instructions: Instruction[]): number => {
  let result = 0;

  instructions.forEach((instruction) => {
    result += evaluate(instruction);
  });

  return result;
};

const instructions: Instruction[] = parseInstructions(input);

console.log("Part one:", sumOfInstructionResults(instructions));
