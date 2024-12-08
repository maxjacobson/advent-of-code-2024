import { readInput } from "./helpers/read-input";

const input = readInput();

type WordSearch = string[][];

const parseAsWordSearch = (input: string): WordSearch => {
  const result: WordSearch = [];

  input.split("\n").forEach((line) => {
    result.push(line.split(""));
  });
  return result;
};

const scan = (
  wordSearch: WordSearch,
  word: string,
  startingX: number,
  startingY: number,
  xDirection: number,
  yDirection: number,
): boolean => {
  for (let i = 0; i < word.length; i++) {
    const x = startingX + i * xDirection;
    const y = startingY + i * yDirection;
    if (wordSearch[y]) {
      if (wordSearch[y][x]) {
        if (wordSearch[y][x] !== word[i]) {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};

const countInstancesOf = (wordSearch: WordSearch, word: string): number => {
  let result = 0;

  for (let y = 0; y < wordSearch.length; y++) {
    for (let x = 0; x < wordSearch[y].length; x++) {
      for (const xx of [-1, 0, 1]) {
        for (const yy of [-1, 0, 1]) {
          const found = scan(wordSearch, word, x, y, xx, yy);

          if (found) {
            result++;
          }
        }
      }
    }
  }
  return result;
};

const reverse = (word: string): string => {
  const result = [];

  for (let i = word.length; i >= 0; i--) {
    result.push(word[i]);
  }

  return result.join("");
};

const countInstancesOfCrosses = (
  wordSearch: WordSearch,
  word: string,
): number => {
  let result = 0;
  const reversed = reverse(word);

  for (let y = 0; y < wordSearch.length; y++) {
    for (let x = 0; x < wordSearch[y].length; x++) {
      const found =
        scan(wordSearch, word, x, y, 1, 1) ||
        scan(wordSearch, reversed, x, y, 1, 1);

      if (found) {
        const otherWay = scan(wordSearch, word, x, y + word.length - 1, 1, -1);
        const otherWayReversed = scan(
          wordSearch,
          reversed,
          x,
          y + word.length - 1,
          1,
          -1,
        );

        if (otherWay || otherWayReversed) {
          result++;
        }
      }
    }
  }

  return result;
};

const wordSearch: WordSearch = parseAsWordSearch(input);

console.log("Part one: ", countInstancesOf(wordSearch, "XMAS"));
console.log("Part two:", countInstancesOfCrosses(wordSearch, "MAS"));
