import {
  Actor,
  CircleCollider,
  CollisionType,
  Engine,
  ImageSource,
  Input,
  Keys,
  PolygonCollider,
  PreUpdateEvent,
  Shape,
  Sprite,
  SpriteSheet,
  Vector,
} from "excalibur";
//@ts-expect-error
import char from "./assets/char.png";

const characterImage = new ImageSource(char);
characterImage.load();
const characterSpriteSheet = SpriteSheet.fromImageSource({
  image: characterImage,
  grid: {
    rows: 12,
    columns: 54,
    spriteWidth: 16,
    spriteHeight: 16,
  },
  spacing: {
    margin: { x: 1, y: 1 },
  },
});

export class Player extends Actor {
  isMoving: boolean = false;

  constructor(position: { x: number; y: number }) {
    super({
      width: 16,
      height: 16,
      radius: 8,
      pos: new Vector(position.x, position.y),
      anchor: new Vector(0, 0),
      collider: new PolygonCollider({
        offset: new Vector(0, 0),
        points: [new Vector(0, 0), new Vector(16, 0), new Vector(16, 16), new Vector(0, 16)],
      }),
      collisionType: CollisionType.Active,
    });
  }

  onInitialize(engine: Engine<any>): void {
    this.graphics.use(characterSpriteSheet.getSprite(1, 6));
  }

  onPreUpdate(engine: Engine<any>, delta: number): void {
    if (!this.isMoving) {
      if (engine.input.keyboard.wasPressed(Keys.Left)) {
        moveTo(new Vector(-16, 0), engine, this);
      }
      if (engine.input.keyboard.wasPressed(Keys.Right)) {
        moveTo(new Vector(16, 0), engine, this);
      }
      if (engine.input.keyboard.wasPressed(Keys.Up)) {
        moveTo(new Vector(0, -16), engine, this);
      }
      if (engine.input.keyboard.wasPressed(Keys.Down)) {
        moveTo(new Vector(0, 16), engine, this);
      }
    }
  }
}

function moveTo(direction: Vector, engine: Engine<any>, actor: Player) {
  //using Player position and engine tilemap, identify curren tile
  const currentTile = engine.currentScene.tileMaps[0].getTileByPoint(actor.pos);
  console.log(currentTile);

  //get next tile based on direction passed in
  const nextTile = engine.currentScene.tileMaps[0].getTileByPoint(new Vector(actor.pos.x + direction.x, actor.pos.y + direction.y));
  //check if tile walkable
  console.log(nextTile);

  if (nextTile && !nextTile.solid) {
    actor.actions.easeTo(new Vector(actor.pos.x + direction.x, actor.pos.y + direction.y), 225);
    actor.isMoving = true;
    actor.on("actioncomplete", () => (actor.isMoving = false));
  }
}
