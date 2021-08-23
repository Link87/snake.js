import Color from 'color';
import p5 from 'p5'

import Game from './game/Game'
import Singleplayer from './game/Singleplayer'
import ColorScheme from './util/Scheme'

/* exported setup, draw, keyPressed */

/**
 * The global game instance. Can be re-initialized to start a new game.
 */
let game: Game;

/**
 * The function to call if a key is pressed.
 */
let keyCallback: () => void;

let scheme: ColorScheme = {
    background: Color('#000000'),
    player: Color('#00ff00'),
    walls: Color('#ffffff'),
    treat: Color('#ff00ff'),
}

const sketch = (p: p5) => {

    p.disableFriendlyErrors = true;

    /**
     * Sets up the canvas and initialized the game.
     * This is the p5 setup method and is called once.
     */
    p.setup = function () {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.style('display', 'block');
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
        game.render(p, scheme);
    }

    /**
     * Calls the global {@link keyCallback} method.
     */
    p.keyPressed = function () {
        keyCallback();
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

}

new p5(sketch);
