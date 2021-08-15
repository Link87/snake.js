import p5 from 'p5'
import * as _ from 'lodash'

import Snake from '../entity/Snake'
import Field from '../field/Field'
import { Direction } from '../util/Types'
import Game from './Game'
import Treat from '../entity/Treat'

/**
 * Defines a game with one player.
 */
export class Singleplayer extends Game {
    /**
     * The {@link Field} to play on. Contains the bounds and render
     * margins/paddings.
     */
    field: Field;
    snake: Snake;
    treat: Treat;

    state: 'waiting' | 'running' | 'paused' | 'game over' = 'waiting'
    /**
     * Creates a new {@link Singleplayer} game instance.
     */
    constructor() {
        super();
        this.field = new Field(33, 33);

        /**
         * The {@link Snake} that plays.
         */
        this.snake = new Snake(16, 16, this.field);
        this.treat = new Treat(this.field);
        this.treat.regenerate();
    }

    /**
     * Upates the game. Call this repeatedly in the game loop.
     */
    update() {
        console.log('update')
        if (this.state === 'running') {
            this.snake.doStep();
            // Eat treat
            if (_.head(this.snake.tiles)!.x === this.treat.tile.x && _.head(this.snake.tiles)!.y === this.treat.tile.y) {
                this.snake.feed();
                this.treat.regenerate(this.snake);
            }
            // check snake for collision with itself
            for (let tile of _.tail(this.snake.tiles)) {
                if (_.head(this.snake.tiles)!.x === tile.x && _.head(this.snake.tiles)!.y === tile.y) {
                    this.state = 'game over'
                }
            }
        }
    }

    /**
     * Renders the game. Call this repeatedly in the game loop.
     */
    render(p: p5) {
        this.field.render(p);
        this.snake.render(p);
        this.treat.render(p);
    }

    /**
     * Updates the {@link Snake} on key events.
     */
    keyCallback(p: p5) {
        return (() => {
            if (this.state === 'waiting') {
                let index = _.indexOf([p.UP_ARROW, p.RIGHT_ARROW, p.DOWN_ARROW, p.LEFT_ARROW], p.keyCode);
                const DIRECTIONS = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
                if (index >= 0) {
                    this.snake.direction = DIRECTIONS[index];
                    this.state = 'running';
                }
            }
            else if (this.state === 'running') {
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
            }
        }).bind(this);
    }
}

export default Singleplayer;
