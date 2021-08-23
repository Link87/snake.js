import p5 from 'p5'
import _ from 'lodash'

import Entity from './Entity'
import Field from '../field/Field'
import { mod } from '../util/Helper'
import { Direction, Tile } from '../util/Types'
import ColorScheme from '../util/Scheme'

/**
 * A snake.
 *
 * Consists of a set of tiles. Each iteration [doStep]{@link Snake#doStep}
 * should be called, which moves all tiles forward.
 */
export class Snake extends Entity {

    public direction: Direction = Direction.NONE;
    public oldDirection: Direction = Direction.NONE;
    private phantomTile: Tile | undefined;

    /**
     * Creates a new {@link Snake} instance.
     * @param {number} x the horizontal starting position
     * @param {number} y the vertical starting position
     * @param {Field} field the field on which the snake moves
     * @param {Direction} direction the direction in which the head moves the next iteration
     * @param {Direction} oldDirection the direction of the previous step
     */
    constructor(public x: number, public y: number, public field: Field) {
        super(field);
        this.tiles = [{ x, y }];
        this.phantomTile = undefined
    }

    /**
     * Adds a tile to the tail of the snake.
     */
    feed() {
        if (this.phantomTile !== undefined) {
            this.tiles.push(this.phantomTile);
        } else {
            console.error('no phantom tile!');
        }
        this.phantomTile = undefined;
    }

    /**
     * Moves the snake forward.
     */
    doStep() {
        if (this.direction == Direction.NONE) {
            return;
        }
        this.phantomTile = { ..._.last(this.tiles)! }
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
    render(p: p5, scheme: ColorScheme) {
        p.fill(scheme.player.rgb().array());
        p.stroke(scheme.player.rgb().array());
        p.strokeWeight(1);
        let offset = this.field.drawingOffset(p.width, p.height);
        let dimension = this.field.tileDimension(p.width, p.height)
        for (const tile of this.tiles) {
            p.square(
                offset.x + tile.x * dimension,
                offset.y + tile.y * dimension,
                dimension
            );
        }
    }
}

export default Snake;
