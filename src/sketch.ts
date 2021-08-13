import p5 from 'p5'

import Game from './game/Game'
import Singleplayer from './game/Singleplayer'

/* exported setup, draw, keyPressed */

/**
 * The global game instance. Can be re-initialized to start a new game.
 */
let game: Game;

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
