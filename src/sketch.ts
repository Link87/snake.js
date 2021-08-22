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
let keyCallback: () => void;

const sketch = (p: p5) => {

    p.disableFriendlyErrors = true;

    /**
     * Sets up the canvas and initialized the game.
     * This is the p5 setup method and is called once.
     */
    p.setup = function () {
        p.createCanvas(640, 640);
        game = new Singleplayer();
        keyCallback = game.keyCallback(p);
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
        keyCallback();
    }

}

new p5(sketch);
