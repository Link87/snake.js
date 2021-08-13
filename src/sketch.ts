import p5 from 'p5';
import Direction from './util/Direction'

/* exported setup, draw, keyPressed */

/**
 * The global game instance. Can be re-initialized to start a new game.
 */
let game: Singleplayer;
/**
 * The function to call if a key is pressed.
 */
let keyCallback: (p: p5) => void;

const sketch = (p: p5) => {
    /**
     * Sets up the canvas and initialized the game.
     * This is the p5 setup method and is called once.
     */
    p.setup = function () {
        p.createCanvas(640, 640);
        game = new Singleplayer();
        keyCallback = game.keyCallback;
        p.frameRate(20);
    }

    /**
     * Updates and draws the game.
     * This is the p5 draw method and is called repeatedly in an endless loop.
     */
    p.draw = function () {
        game.update();
        game.render(p);
    }

    /**
     * Calls the global {@link keyCallback} method.
     */
    p.keyPressed = function () {
        console.log(p.keyCode)
        keyCallback(p);
    }

}

new p5(sketch);

/**
 * Defines a game with one player.
 */
class Singleplayer {
    field: Field;
    snake: Snake;
    /**
     * Creates a new {@link Singleplayer} game instance.
     */
    constructor() {
        /**
         * The {@link Field} to play on. Contains the bounds and render
         * margins/paddings.
         */
        this.field = new Field(33, 33);

        /**
         * The {@link Snake} that plays.
         */
        this.snake = new Snake(16, 16, this.field);
        // this.treat = new Treat(this.field);
        // this.treat.regenerate();
    }

    /**
     * Upates the game. Call this repeatedly in the game loop.
     */
    update() {
        this.snake.doStep();
        // Eat treat
        // if (this.snake.tiles[0].x == this.treat.x && this.snake.tiles[0].y == this.treat.y) {
        //  this.treat.regenerate();
        //  this.snake.feed();
        // }
    }

    /**
     * Renders the game. Call this repeatedly in the game loop.
     */
    render(p: p5) {
        this.field.render(p);
        this.snake.render(p);
        // this.treat.render();
    }

    /**
     * Updates the {@link Snake} on key events.
     */
    keyCallback(p: p5) {
        return () => {
            if (p.keyCode === p.UP_ARROW &&
                this.snake.oldDirection !== Direction.DOWN) {
                this.snake.direction = Direction.UP;
            } else if (p.keyCode === p.RIGHT_ARROW &&
                this.snake.oldDirection !== Direction.LEFT) {
                this.snake.direction = Direction.RIGHT;
            } else if (p.keyCode === p.DOWN_ARROW &&
                this.snake.oldDirection !== Direction.UP) {
                this.snake.direction = Direction.DOWN;
            } else if (p.keyCode === p.LEFT_ARROW &&
                this.snake.oldDirection !== Direction.RIGHT) {
                this.snake.direction = Direction.LEFT;
            }
        };
    }
}

type Tile = { x: number, y: number };

/**
 * A field on which a game is played.
 *
 * Contains geometry data about the field. This includes logical information
 * like the amount of tiles as well as rendering information like tile
 * size or paddings.
 */
class Field {

    /**
     * Creates a new {@link Field} instance.
     * @param {number} width the amount of tiles in horizontal direction
     * @param {number} height the amount of tiles in vertical direction
     */
    constructor(public width: number, public height: number) {
    }

    /**
     * Returns the width and height in pixels of a single tile.
     * @return {number} the dimensions of a single tile on screen.
     */
    get tileDimension(): number {
        return 640 / this.width;
    }

    /**
     * 
     */
    render(p: p5) {
        p.background(255);
        p.fill(255);
        p.stroke(0);
        p.rect(0, 0, p.width - 1, p.height - 1);
    }
}

/**
 * 
 */
abstract class Entity {

    /**
     * @param {Field} field the field on which the entity is placed
     * @param {Tile[]} tiles the tiles the entity initially consists of
     */
    protected constructor(public field: Field, public tiles: Tile[] = []) {
    }

    /**
     * 
     */
    abstract render(p: p5): void;
}

/**
 * A snake.
 *
 * Consists of a set of tiles. Each iteration [doStep]{@link Snake#doStep}
 * should be called, which moves all tiles forward.
 */
class Snake extends Entity {
    /**
     * Creates a new {@link Snake} instance.
     * @param {number} x the horizontal starting position
     * @param {number} y the vertical starting position
     * @param {Field} field the field on which the snake moves
     * @param {Direction} direction the direction in which the head moves the next iteration
     * @param {Direction} oldDirection the direction of the previous step
     */
    constructor(public x: number, public y: number, public field: Field, public direction: Direction = Direction.NONE, public oldDirection: Direction = Direction.NONE) {
        super(field);
        this.tiles = [{ x, y }, { x, y: y + 1 }, { x, y: y + 2 }];
    }

    /**
     * Adds a tile to the tail of the snake.
     */
    // feed() {}

    /**
     * Moves the snake forward.
     */
    doStep() {
        if (this.direction == Direction.NONE) {
            return;
        }
        for (let i = this.tiles.length - 1; i > 0; i--) {
            this.tiles[i].x = this.tiles[i - 1].x;
            this.tiles[i].y = this.tiles[i - 1].y;
        }
        this.tiles[0].x = mod(this.tiles[0].x + this.direction.dx,
            this.field.width);
        this.tiles[0].y = mod(this.tiles[0].y + this.direction.dy,
            this.field.height);
        this.oldDirection = this.direction;
    }

    /**
     * Draws the snake.
     */
    render(p: p5) {
        p.fill(0);
        for (const tile of this.tiles) {
            p.fill(0);
            p.noStroke();
            p.square(tile.x * this.field.tileDimension,
                tile.y * this.field.tileDimension,
                this.field.tileDimension);
        }
    }
}


/*/**
 * A treat that can be collected and lets the collecting snake grow.
 * @constructor
 * @param {Field} field the field the treat is positioned on
 * @param {Snake} entities the game entities that own tiles
 */
/*class Treat {
  constructor(field, ...entities) {
    this.x = 10;
    this.y = 10;
    this.field = field;
    this.entities = entities;
    this.regenerate = function () {
      this.x = int(Math.random() * field.width);
      this.y = int(Math.random() * field.height);
    };
    this.render = function () {
      fill(255, 0, 0);
      noStroke();
      square(this.x * this.field.tileDimension, this.y * this.field.tileDimension, this.field.tileDimension);
  };
}
}*/

const mod = (x: number, n: number) => (x % n + n) % n;
