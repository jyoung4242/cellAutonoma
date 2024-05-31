import { ImageSource, Sprite, SpriteSheet } from "excalibur";

//@ts-expect-error
import testtileimage from "./assets/testtileset.png";

const testResource = new ImageSource(testtileimage);
testResource.load();

export const testSpriteSheet = SpriteSheet.fromImageSource({
  image: testResource,
  grid: {
    rows: 7,
    columns: 7,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

export const tilebitmask: Record<number, Sprite> = {
  0: testSpriteSheet.getSprite(3, 3),
  1: testSpriteSheet.getSprite(3, 3),
  4: testSpriteSheet.getSprite(3, 3),
  128: testSpriteSheet.getSprite(3, 3),
  32: testSpriteSheet.getSprite(3, 3),
  11: testSpriteSheet.getSprite(0, 0),
  175: testSpriteSheet.getSprite(0, 0),
  15: testSpriteSheet.getSprite(0, 0),
  47: testSpriteSheet.getSprite(0, 0),
  207: testSpriteSheet.getSprite(0, 5),
  203: testSpriteSheet.getSprite(0, 5),
  124: testSpriteSheet.getSprite(3, 5),
  43: testSpriteSheet.getSprite(0, 0),
  31: testSpriteSheet.getSprite(1, 0),
  191: testSpriteSheet.getSprite(1, 0),
  159: testSpriteSheet.getSprite(1, 0),
  63: testSpriteSheet.getSprite(1, 0),
  22: testSpriteSheet.getSprite(2, 0),
  23: testSpriteSheet.getSprite(2, 0),
  183: testSpriteSheet.getSprite(2, 0),
  151: testSpriteSheet.getSprite(2, 0),
  117: testSpriteSheet.getSprite(2, 0),
  150: testSpriteSheet.getSprite(2, 0),
  107: testSpriteSheet.getSprite(0, 1),
  239: testSpriteSheet.getSprite(0, 1),
  235: testSpriteSheet.getSprite(0, 1),
  111: testSpriteSheet.getSprite(0, 1),
  255: testSpriteSheet.getSprite(1, 1),
  214: testSpriteSheet.getSprite(2, 1),
  246: testSpriteSheet.getSprite(2, 1),
  247: testSpriteSheet.getSprite(2, 1),
  230: testSpriteSheet.getSprite(3, 1),
  215: testSpriteSheet.getSprite(2, 1),
  231: testSpriteSheet.getSprite(3, 1),
  104: testSpriteSheet.getSprite(0, 2),
  236: testSpriteSheet.getSprite(0, 2),
  233: testSpriteSheet.getSprite(0, 2),
  232: testSpriteSheet.getSprite(0, 2),
  125: testSpriteSheet.getSprite(3, 5),
  110: testSpriteSheet.getSprite(0, 4),
  145: testSpriteSheet.getSprite(0, 2),
  105: testSpriteSheet.getSprite(0, 2),
  248: testSpriteSheet.getSprite(1, 2),
  208: testSpriteSheet.getSprite(2, 2),
  244: testSpriteSheet.getSprite(2, 2),
  240: testSpriteSheet.getSprite(2, 2),
  212: testSpriteSheet.getSprite(2, 2),
  241: testSpriteSheet.getSprite(2, 2),
  213: testSpriteSheet.getSprite(2, 2),
  211: testSpriteSheet.getSprite(1, 4),
  221: testSpriteSheet.getSprite(2, 2),
  217: testSpriteSheet.getSprite(2, 5),
  2: testSpriteSheet.getSprite(3, 0),
  7: testSpriteSheet.getSprite(3, 0),
  135: testSpriteSheet.getSprite(3, 0),
  3: testSpriteSheet.getSprite(3, 0),
  55: testSpriteSheet.getSprite(2, 0),
  66: testSpriteSheet.getSprite(3, 1),
  194: testSpriteSheet.getSprite(3, 1),
  226: testSpriteSheet.getSprite(3, 1),
  198: testSpriteSheet.getSprite(3, 1),
  227: testSpriteSheet.getSprite(3, 1),
  98: testSpriteSheet.getSprite(3, 1),
  71: testSpriteSheet.getSprite(3, 1),
  70: testSpriteSheet.getSprite(3, 1),
  195: testSpriteSheet.getSprite(3, 1),
  199: testSpriteSheet.getSprite(3, 1),
  6: testSpriteSheet.getSprite(3, 1),
  64: testSpriteSheet.getSprite(3, 2),
  192: testSpriteSheet.getSprite(3, 2),
  224: testSpriteSheet.getSprite(3, 2),
  68: testSpriteSheet.getSprite(3, 2),
  96: testSpriteSheet.getSprite(3, 2),
  8: testSpriteSheet.getSprite(0, 3),
  41: testSpriteSheet.getSprite(0, 3),
  45: testSpriteSheet.getSprite(0, 3),
  44: testSpriteSheet.getSprite(0, 3),
  24: testSpriteSheet.getSprite(1, 3),
  108: testSpriteSheet.getSprite(0, 3),
  152: testSpriteSheet.getSprite(1, 3),
  156: testSpriteSheet.getSprite(1, 3),
  56: testSpriteSheet.getSprite(1, 3),
  157: testSpriteSheet.getSprite(1, 3),
  57: testSpriteSheet.getSprite(1, 3),
  184: testSpriteSheet.getSprite(1, 3),
  185: testSpriteSheet.getSprite(1, 3),
  188: testSpriteSheet.getSprite(1, 3),
  189: testSpriteSheet.getSprite(1, 3),
  60: testSpriteSheet.getSprite(1, 3),
  153: testSpriteSheet.getSprite(1, 3),
  61: testSpriteSheet.getSprite(1, 3),
  28: testSpriteSheet.getSprite(1, 3),
  25: testSpriteSheet.getSprite(1, 3),
  16: testSpriteSheet.getSprite(2, 3),
  144: testSpriteSheet.getSprite(2, 3),
  148: testSpriteSheet.getSprite(2, 3),
  176: testSpriteSheet.getSprite(2, 3),
  20: testSpriteSheet.getSprite(2, 3),
  52: testSpriteSheet.getSprite(2, 3),
  254: testSpriteSheet.getSprite(4, 0),
  252: testSpriteSheet.getSprite(1, 2),
  253: testSpriteSheet.getSprite(1, 2),
  223: testSpriteSheet.getSprite(4, 1),
  251: testSpriteSheet.getSprite(5, 0),
  249: testSpriteSheet.getSprite(1, 2),
  127: testSpriteSheet.getSprite(5, 1),
  123: testSpriteSheet.getSprite(6, 0),
  95: testSpriteSheet.getSprite(6, 1),
  222: testSpriteSheet.getSprite(6, 2),
  250: testSpriteSheet.getSprite(6, 3),
  94: testSpriteSheet.getSprite(4, 2),
  218: testSpriteSheet.getSprite(4, 3),
  122: testSpriteSheet.getSprite(5, 2),
  91: testSpriteSheet.getSprite(5, 3),
  106: testSpriteSheet.getSprite(0, 4),
  234: testSpriteSheet.getSprite(0, 4),
  75: testSpriteSheet.getSprite(0, 5),
  79: testSpriteSheet.getSprite(0, 5),
  210: testSpriteSheet.getSprite(1, 4),
  242: testSpriteSheet.getSprite(1, 4),
  86: testSpriteSheet.getSprite(1, 5),
  87: testSpriteSheet.getSprite(1, 5),
  118: testSpriteSheet.getSprite(1, 5),
  119: testSpriteSheet.getSprite(1, 5),
  30: testSpriteSheet.getSprite(2, 4),
  190: testSpriteSheet.getSprite(2, 4),
  158: testSpriteSheet.getSprite(2, 4),
  59: testSpriteSheet.getSprite(3, 4),
  216: testSpriteSheet.getSprite(2, 5),
  220: testSpriteSheet.getSprite(2, 5),
  27: testSpriteSheet.getSprite(3, 4),
  121: testSpriteSheet.getSprite(3, 5),
  120: testSpriteSheet.getSprite(3, 5),
  219: testSpriteSheet.getSprite(2, 6),
  126: testSpriteSheet.getSprite(3, 6),
  10: testSpriteSheet.getSprite(4, 4),
  46: testSpriteSheet.getSprite(4, 4),
  74: testSpriteSheet.getSprite(4, 5),
  72: testSpriteSheet.getSprite(4, 6),
  26: testSpriteSheet.getSprite(5, 4),
  90: testSpriteSheet.getSprite(5, 5),
  88: testSpriteSheet.getSprite(5, 6),
  92: testSpriteSheet.getSprite(5, 6),
  18: testSpriteSheet.getSprite(6, 4),
  146: testSpriteSheet.getSprite(6, 4),
  82: testSpriteSheet.getSprite(6, 5),
  80: testSpriteSheet.getSprite(6, 6),
  84: testSpriteSheet.getSprite(6, 6),
  116: testSpriteSheet.getSprite(6, 6),
  62: testSpriteSheet.getSprite(2, 4),
  147: testSpriteSheet.getSprite(6, 4),
  102: testSpriteSheet.getSprite(3, 1),
  109: testSpriteSheet.getSprite(0, 2),
  38: testSpriteSheet.getSprite(3, 0),
  42: testSpriteSheet.getSprite(4, 4),
  201: testSpriteSheet.getSprite(4, 6),
  14: testSpriteSheet.getSprite(4, 4),
  243: testSpriteSheet.getSprite(1, 4),
  40: testSpriteSheet.getSprite(0, 3),
  196: testSpriteSheet.getSprite(3, 2),
};