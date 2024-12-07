import { readInput } from "./helpers/read-input";

const input = readInput();

type Report = number[];

const parseAsReports = (input: string): Report[] => {
  const reports = [];

  input.split("\n").forEach((line) => {
    const report = [];

    line.split(/\s+/).forEach((num) => {
      report.push(parseInt(num));
    });

    reports.push(report);
  });

  return reports;
};

const isSafe = (report: Report): boolean => {
  let direction: "increasing" | "decreasing";

  if (report[1] > report[0]) {
    direction = "increasing";
  } else {
    direction = "decreasing";
  }

  for (let i = 0; i < report.length - 1; i++) {
    const value = report[i];
    const nextValue = report[i + 1];
    const distance = Math.abs(value - nextValue);

    if (distance < 1 || distance > 3) {
      return false;
    }

    if (nextValue > value && direction === "decreasing") {
      return false;
    } else if (nextValue < value && direction === "increasing") {
      return false;
    }
  }

  return true;
};

const countSafe = (reports: Report[]): number => {
  let result = 0;

  reports.forEach((report) => {
    if (isSafe(report)) {
      result += 1;
    }
  });

  return result;
};

const reportsWithEachLevelRemoved = (report: Report): Report[] => {
  const alts = [];

  for (let i = 0; i < report.length; i++) {
    const alt = report.slice();
    alt.splice(i, 1);

    alts.push(alt);
  }

  return alts;
};

const countSafeWithDampener = (reports: Report[]): number => {
  let result = 0;

  reports.forEach((report) => {
    if (isSafe(report)) {
      result += 1;
    } else {
      const alts: Report[] = reportsWithEachLevelRemoved(report);

      if (alts.some((alt) => isSafe(alt))) {
        result += 1;
      }
    }
  });

  return result;
};

const reports: Report[] = parseAsReports(input);

console.log("Part one:", countSafe(reports));
console.log("Part one:", countSafeWithDampener(reports));
