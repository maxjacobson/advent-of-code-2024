export const sum = (numbers: number[]): number => {
  return numbers.reduce((sum, num) => sum + num, 0);
};
