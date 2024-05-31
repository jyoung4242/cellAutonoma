import { PerlinGenerator } from "@excaliburjs/plugin-perlin";

export interface noiseConfig {
  seed: number;
  frequency: number;
  amplitude: number;
  octaves: number;
  persistance: number;
}

export class GeneratedTileMap {
  width: number;
  height: number;
  map: number[];
  generator: PerlinGenerator | null = null;
  loops: number;

  constructor(width: number, height: number, iterations: number, noiseConfig?: noiseConfig) {
    if (noiseConfig) {
      this.generator = new PerlinGenerator(noiseConfig);
    }

    this.loops = iterations;
    this.width = width;
    this.height = height;
    this.map = this.initializeMap();
    this.generateMap();
  }

  private initializeMap(): number[] {
    const numtiles = this.width * this.height;
    const map = new Array(numtiles).fill(0);
    return map;
  }

  private generateMap(): void {
    this.randomFillMap();

    for (let i = 0; i < this.loops; i++) {
      this.map = this.applyCellularAutomataRules();
    }
  }

  private randomFillMap(): void {
    for (let i = 0; i < this.height * this.width; i++) {
      const y = Math.floor(i / this.width);
      const x = i % this.width;

      //use noise field to fill map
      if (this.generator) {
        const noiseVal = this.generator.noise(x / this.width, y / this.height);

        if (noiseVal > 0.5) {
          this.map[i] = 1;
        } else {
          this.map[i] = 0;
        }
      } else {
        this.map[i] = Math.random() < 0.45 ? 1 : 0; // Randomly place walls (1) and floors (0)
      }
    }
  }

  private applyCellularAutomataRules(): number[] {
    const newMap = this.initializeMap();

    for (let i = 0; i < this.height * this.width; i++) {
      for (let x = 0; x < this.width; x++) {
        const wallCount = this.countAdjacentWalls(i);
        if (this.map[i] === 1) {
          if (wallCount < 4) {
            newMap[i] = 0; // Change to floor if there are less than 4 adjacent walls
          } else {
            newMap[i] = 1; // Remain wall
          }
        } else {
          if (wallCount >= 5) {
            newMap[i] = 1; // Change to wall if there are 5 or more adjacent walls
          } else {
            newMap[i] = 0; // Remain floor
          }
        }
      }
    }

    return newMap;
  }

  private countAdjacentWalls(index: number): number {
    let count = 0;

    const y = Math.floor(index / this.width);
    const x = index % this.width;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        //if (this.map[y + i][x + j] === 1) count++;

        const newY = y + i;
        const newX = x + j;
        if (newY >= 0 && newY < this.height && newX >= 0 && newX < this.width) {
          const adjacentIndex = newY * this.width + newX;
          if (this.map[adjacentIndex] === 1) count++;
        } else {
          count++; // Perceive out of bounds as wall
        }
      }
    }

    return count;
  }
}
