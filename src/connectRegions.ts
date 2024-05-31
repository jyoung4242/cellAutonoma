type Cell = { x: number; y: number };

// Utility functions to convert between 1D and 2D coordinates
function indexToCoord(index: number, width: number): Cell {
  return { x: index % width, y: Math.floor(index / width) };
}

function coordToIndex(x: number, y: number, width: number): number {
  return y * width + x;
}

export function identifyRegions(grid: number[], width: number, height: number): Cell[][] {
  const visited = new Array(grid.length).fill(false); // Initialize visited array
  const directions = [
    { x: 0, y: 1 }, // Right
    { x: 1, y: 0 }, // Down
    { x: 0, y: -1 }, // Left
    { x: -1, y: 0 }, // Up
  ];

  // Checks if the cell at a given index is valid for flood fill
  function isValid(index: number): boolean {
    const { x, y } = indexToCoord(index, width);
    return x >= 0 && x < width && y >= 0 && y < height && !visited[index] && grid[index] === 0;
  }

  // Flood fill function to explore and mark all connected cells in the same region
  function floodFill(index: number, region: Cell[]): void {
    const stack: number[] = [index];
    while (stack.length > 0) {
      const currentIndex = stack.pop()!;
      if (visited[currentIndex]) continue;
      visited[currentIndex] = true;
      const cell = indexToCoord(currentIndex, width);
      region.push(cell);

      // Check all adjacent cells
      for (const dir of directions) {
        const nx = cell.x + dir.x;
        const ny = cell.y + dir.y;
        const neighborIndex = coordToIndex(nx, ny, width);
        if (isValid(neighborIndex)) {
          stack.push(neighborIndex);
        }
      }
    }
  }

  const regions: Cell[][] = [];
  for (let index = 0; index < grid.length; index++) {
    if (grid[index] === 0 && !visited[index]) {
      const newRegion: Cell[] = [];
      floodFill(index, newRegion);
      regions.push(newRegion);
    }
  }
  return regions;
}

function findClosestCells(region1: Cell[], region2: Cell[]): [Cell, Cell] {
  let minDist = Infinity;
  let closestPair: [Cell, Cell] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  for (const cell1 of region1) {
    for (const cell2 of region2) {
      const dist = Math.abs(cell1.x - cell2.x) + Math.abs(cell1.y - cell2.y); // Manhattan distance
      if (dist < minDist) {
        minDist = dist;
        closestPair = [cell1, cell2];
      }
    }
  }

  return closestPair;
}

function createPath(grid: number[], width: number, start: Cell, end: Cell): void {
  let { x: x0, y: y0 } = start;
  let { x: x1, y: y1 } = end;

  // Step 1: Move horizontally from start.x to end.x
  while (x0 !== x1) {
    grid[coordToIndex(x0, y0, width)] = 0; // Make the current cell walkable
    if (x0 < x1) x0++; // Move right if x0 < x1
    else if (x0 > x1) x0--; // Move left if x0 > x1
  }

  // Step 2: Move vertically from start.y to end.y
  while (y0 !== y1) {
    grid[coordToIndex(x0, y0, width)] = 0; // Make the current cell walkable
    if (y0 < y1) y0++; // Move down if y0 < y1
    else if (y0 > y1) y0--; // Move up if y0 > y1
  }

  // Ensure the end cell is also walkable
  grid[coordToIndex(x1, y1, width)] = 0;
}

function connectRegions(region1: Cell[], region2: Cell[], grid: number[], width: number, height: number): void {
  const [start, end] = findClosestCells(region1, region2);
  createPath(grid, width, start, end);
}

export function resolveRegions(regions: Cell[][], grid: number[], width: number, height: number, cullingLimit: number) {
  //loop through regions and use culling to set small regions to 1
  for (const region of regions) {
    if (region.length < cullingLimit) {
      for (const cell of region) {
        grid[coordToIndex(cell.x, cell.y, width)] = 1;
      }
    }
  }

  //connect remaining regions
  for (let i = 0; i < regions.length; i++) {
    for (let j = i + 1; j < regions.length; j++) {
      connectRegions(regions[i], regions[j], grid, width, height);
    }
  }

  return grid;
}

// Function to find the first walkable tile in the grid
export function findFirstWalkableTile(grid: number[], width: number): Cell | null {
  for (let index = 0; index < grid.length; index++) {
    if (grid[index] === 0) {
      return indexToCoord(index, width);
    }
  }
  return null; // Return null if no walkable tile is found
}
