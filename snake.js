'use strict';

/* exported setup, draw, keyPressed */

/**
 * The global game instance. Can be re-initialized to start a new game.
 */
let game;
/**
 * The function to call if a key is pressed.
 */
let keyCallback;

/**
 * Defines the directions snakes can walk in.
 * @readonly
 * @enum {number}
 */
const Direction = {
  NONE: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  LEFT: 4,
};

/**
 * Sets up the canvas and initialized the game.
 * This is the p5 setup method and is called once.
 */
function setup() {
  createCanvas(640, 640);
  game = new Singleplayer();
  keyCallback = game.keyCallback;
  frameRate(20);
}

/**
 * Updates and draws the game.
 * This is the p5 draw method and is called repeatedly in an endless loop.
 */
function draw() {
  background(255);
  fill(255);
  rect(0, 0, width - 1, height - 1);
  game.update();
  game.render();
}

/**
 * Calls the global {@link keyCallback} method.
 */
function keyPressed() {
  keyCallback();
}

/**
 * Defines a game with one player.
 * @constructor
 */
function Singleplayer() {
  /**
   * The {@link Field} to play on. Contains the bounds and render
   * margins/paddings.
   */
  this.field = new Field(33, 33);

  /**
   * The {@link Snake} that plays.
   */
  this.snake = new Snake(16, 16, this.field);

  /**
   * Upates the game. Call this repeatedly in the game loop.
   */
  this.update = function() {
    this.snake.doStep();
  };

  /**
   * Renders the game. Call this repeatedly in the game loop.
   */
  this.render = function() {
    this.snake.render();
  };

  /**
   * Updates the {@link Snake} on key events.
   */
  this.keyCallback = () => {
    if (keyCode == UP_ARROW &&
        this.snake.oldDirection != Direction.DOWN) {
      this.snake.direction = Direction.UP;
    } else if (keyCode == RIGHT_ARROW &&
        this.snake.oldDirection != Direction.LEFT) {
      this.snake.direction = Direction.RIGHT;
    } else if (keyCode == DOWN_ARROW &&
        this.snake.oldDirection != Direction.UP) {
      this.snake.direction = Direction.DOWN;
    } else if (keyCode == LEFT_ARROW &&
        this.snake.oldDirection != Direction.RIGHT) {
      this.snake.direction = Direction.LEFT;
    }
  };
}

/**
 * A field on which a game is played.
 *
 * Contains geometry data about the field. This includes logical information
 * like the amount of tiles as well as rendering information like tile
 * size or paddings.
 * @constructor
 * @param {number} width the amount of tiles in horizontal direction
 * @param {number} height the amount of tiles in vertical direction
 */
function Field(width, height) {
  this.width = width;
  this.height = height;

  this.tileDimension = 640 / this.width;
}

/**
 * A snake.
 *
 * Consists of a set of tiles. Each iteration [doStep]{@link Snake#doStep}
 * should be called, which moves all tiles forward.
 *
 * @constructor
 * @param {number} x the horizontal starting position
 * @param {number} y the vertical starting position
 * @param {Field} field the field on which the snake moves
 */
function Snake(x, y, field) {
  /**
   * The tiles the snake consists of.
   */
  this.tiles = [{x, y}, {x, y: y + 1}, {x, y: y + 2}];
  /**
   * The direction in which the head moves the next iteration.
   */
  this.direction = Direction.NONE;
  /**
   * The direction of the previous step.
   */
  this.oldDirection = Direction.NONE;
  /**
   * The field the snake is on.
   */
  this.field = field;

  /**
   * Moves the snake forward.
   */
  this.doStep = function() {
    if (this.direction == Direction.NONE) return;

    for (let i = this.tiles.length - 1; i > 0; i--) {
      this.tiles[i].x = this.tiles[i - 1].x;
      this.tiles[i].y = this.tiles[i - 1].y;
    }

    let dx = 0;
    let dy = 0;
    switch (this.direction) {
      case Direction.UP:
        dy = -1;
        break;
      case Direction.RIGHT:
        dx = 1;
        break;
      case Direction.DOWN:
        dy = 1;
        break;
      case Direction.LEFT:
        dx = -1;
        break;
    }

    this.tiles[0].x = mod(this.tiles[0].x + dx, this.field.width);
    this.tiles[0].y = mod(this.tiles[0].y + dy, this.field.height);

    this.oldDirection = this.direction;
  };

  /**
   * Draws the snake.
   */
  this.render = function() {
    fill(0);
    for (const tile of this.tiles) {
      rect(tile.x * this.field.tileDimension, tile.y * this.field.tileDimension,
          this.field.tileDimension, this.field.tileDimension);
    }
  };
}

const mod = (x, n) => (x % n + n) % n;
