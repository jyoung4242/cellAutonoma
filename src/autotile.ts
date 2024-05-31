import { GeneratedTileMap } from "./generateLevel";

enum TileType {
  Floor = 0,
  Wall = 1,
}

const TILE_SIZE = 16; // Example tile size

const neighborOffsets = [
  [1, 1],
  [0, 1],
  [-1, 1],
  [1, 0],
  [-1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
/*
 [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
*/

export function getTileMapBitMask(map: GeneratedTileMap): number[] {
  let bitmask: number[] = new Array(map.width * map.height).fill(0);

  let tileIndex = 0;
  for (let tile of map.map) {
    bitmask[tileIndex] = getBitmask(map.map, tileIndex, map.width, map.height, 1);
    tileIndex++;
  }

  return bitmask;
}

function getBitmask(map: number[], index: number, width: number, height: number, outofbound: number): number {
  let bitmask = 0;

  let y = Math.floor(index / width);
  let x = index % width;

  for (let i = 0; i < neighborOffsets.length; i++) {
    const [dx, dy] = neighborOffsets[i];
    const nx = x + dx;
    const ny = y + dy;
    const altIndex = nx + ny * width;

    if (ny < 0 || ny >= height || nx < 0 || nx >= width) bitmask |= outofbound << i;
    else if (map[altIndex] === TileType.Wall) bitmask |= 1 << i;
  }
  //console.log("index", index, "bitmask", bitmask.toString(2), bitmask);

  return bitmask;
}
