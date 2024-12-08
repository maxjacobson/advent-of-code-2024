import { readInput } from "./helpers/read-input";

const input = readInput();

type Direction = "left" | "right" | "up" | "down";

type Guard = {
  direction: Direction;
  position: Coordinate;
};

type Obstacle = "#";

type NotVisited = ".";

type Visited = "X";

type CoordinateOccupant = Obstacle | NotVisited | Visited;

type Map = CoordinateOccupant[][];
type Coordinate = { x: number; y: number };

const parse = (input: string): [Map, Guard] => {
  const guard: Guard = {
    direction: "up",
    position: { x: 0, y: 0 },
  };

  const map: Map = [];

  const lines = input.split("\n");
  for (let y = 0; y < lines.length; y++) {
    map[y] = [];
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const occupant = line[x];

      if (occupant === "^") {
        guard.position = { x, y };
        map[y][x] = "X";
      } else if (occupant === "#") {
        map[y][x] = "#";
      } else {
        map[y][x] = ".";
      }
    }
  }

  return [map, guard];
};

const rotate = (guard: Guard) => {
  if (guard.direction === "right") {
    guard.direction = "down";
  } else if (guard.direction === "down") {
    guard.direction = "left";
  } else if (guard.direction === "left") {
    guard.direction = "up";
  } else if (guard.direction === "up") {
    guard.direction = "right";
  }
};

const patrol = (map: Map, guard: Guard) => {
  map[guard.position.y][guard.position.x] = "X";

  let next: Coordinate;

  if (guard.direction === "left") {
    next = { x: guard.position.x - 1, y: guard.position.y };
  } else if (guard.direction === "right") {
    next = { x: guard.position.x + 1, y: guard.position.y };
  } else if (guard.direction === "up") {
    next = { x: guard.position.x, y: guard.position.y - 1 };
  } else if (guard.direction === "down") {
    next = { x: guard.position.x, y: guard.position.y + 1 };
  }

  if (map[next.y] && map[next.y][next.x]) {
    if (map[next.y][next.x] === "#") {
      rotate(guard);
      patrol(map, guard);
    } else {
      guard.position = next;
      patrol(map, guard);
    }
  }
};

const countVisited = (map: Map): number => {
  let result = 0;

  for (const line of map) {
    for (const item of line) {
      if (item === "X") {
        result++;
      }
    }
  }

  return result;
};

{
  const [map, guard] = parse(input);

  patrol(map, guard);

  console.log("Part one:", countVisited(map));
}
