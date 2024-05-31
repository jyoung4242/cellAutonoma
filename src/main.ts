import "./style.css";
import { GeneratedTileMap } from "./generateLevel";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, TileMap, Vector, Keys, Sprite, ImageSource, Text, Color, Font } from "excalibur";
import { getTileMapBitMask } from "./autotile";
import { testSpriteSheet, tilebitmask } from "./tilemapping";
//@ts-expect-error
import border from "./assets/border.png";
import { findFirstWalkableTile, identifyRegions, resolveRegions } from "./connectRegions";
import { Player } from "./actor";

const floor = testSpriteSheet.getSprite(0, 6);
const model = {};
const template = `
<style> 
    canvas{ 
        position: fixed; 
        top:50%; 
        left:50%; 
        transform: translate(-50% , -50%); 
    }
</style> 
<div> 
    <canvas id='cnv'> </canvas> 
</div>`;
await UI.create(document.body, model, template).attached;

let level = new GeneratedTileMap(25, 25, 5, { seed: Date.now(), frequency: 24, amplitude: 1.3, octaves: 5, persistance: 0.5 });
const regions = identifyRegions(level.map, level.width, level.height);
level.map = resolveRegions(regions, level.map, level.width, level.height, 3);
let levelBitMask = getTileMapBitMask(level);

let tilemap = new TileMap({
  rows: 25,
  columns: 25,
  tileWidth: 16,
  tileHeight: 16,
});

setupTilemap(tilemap);

const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
});
await game.start();
game.add(tilemap);
const startingLocation = findFirstWalkableTile(level.map, level.width);
console.log(startingLocation);

if (!startingLocation) throw Error("No starting location found");

const myActor = new Player({ x: startingLocation.x * 16, y: startingLocation.y * 16 });
game.add(myActor);
game.currentScene.camera.pos = new Vector(175, 200);
game.currentScene.camera.strategy.lockToActor(myActor);
game.currentScene.camera.zoom = 3;

game.currentScene.input.keyboard.on("press", evt => {
  if (evt.key == Keys.Space) {
    console.clear();
    game.currentScene.remove(game.currentScene.tileMaps[0]);
    level = new GeneratedTileMap(25, 25, 5, { seed: Date.now(), frequency: 24, amplitude: 1.3, octaves: 5, persistance: 0.5 });
    const regions = identifyRegions(level.map, level.width, level.height);
    level.map = resolveRegions(regions, level.map, level.width, level.height, 4);
    levelBitMask = getTileMapBitMask(level);
    tilemap = setupTilemap(tilemap);
    game.add(tilemap);
  }
});

function setupTilemap(tilemap: TileMap): TileMap {
  let tileindex = 0;

  for (const tile of tilemap.tiles) {
    if (level.map[tileindex] === 1) {
      tile.addGraphic(floor);
      //get bitmask
      let bitmask = levelBitMask[tileindex];
      //get sprite from bitmask
      let sprite: Sprite = tilebitmask[bitmask];
      tile.addGraphic(sprite);
      tile.solid = true;
    } else {
      tile.addGraphic(floor);
      tile.solid = false;
    }
    tileindex++;
  }

  return tilemap;
}
