import p5 from 'p5'

import Entity from './Entity'
import Field from '../field/Field'
import { mod } from '../util/Helper'
import { Direction } from '../util/Types'

/**
 * A snake.
 *
 * Consists of a set of tiles. Each iteration [doStep]{@link Snake#doStep}
 * should be called, which moves all tiles forward.
 */
export class Snake extends Entity {
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

export default Snake;
