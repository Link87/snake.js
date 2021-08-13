import p5 from 'p5'

import Snake from '../entity/Snake'
import Field from '../field/Field'
import { Direction } from '../util/Types'
import Game from './Game'

/**
 * Defines a game with one player.
 */
export class Singleplayer extends Game {
    field: Field;
    snake: Snake;
    /**
     * Creates a new {@link Singleplayer} game instance.
     */
    constructor() {
        super();
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

export default Singleplayer;