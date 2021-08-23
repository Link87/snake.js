import p5 from 'p5'
import ColorScheme from '../util/Scheme';
import { Position } from '../util/Types';

/**
 * A field on which a game is played.
 *
 * Contains geometry data about the field. This includes logical information
 * like the amount of tiles as well as rendering information like tile
 * size or paddings.
 */
export class Field {

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
    tileDimension(canvasWidth: number, canvasHeight: number): number {
        const borderWidth = 1;
        let horizontalDimension = canvasWidth / (this.width + 2 * borderWidth);
        let verticalDimension = canvasHeight / (this.height + 2 * borderWidth);
        return Math.min(horizontalDimension, verticalDimension);
    }

    drawingOffset(canvasWidth: number, canvasHeight: number): Position {
        const borderWidth = 1;
        let horizontalDimension = canvasWidth / (this.width + 2 * borderWidth);
        let verticalDimension = canvasHeight / (this.height + 2 * borderWidth);
        if (verticalDimension < horizontalDimension) {
            // horizontal orientation -> center in canvas
            return {
                x: (canvasWidth - this.width * verticalDimension) / 2,
                y: borderWidth * verticalDimension,
            }
        }
        else {
            // vertical orientation -> stick to top
            return {
                x: borderWidth * horizontalDimension,
                y: borderWidth * horizontalDimension,
            }
        }
    }

    /**
     * 
     */
    render(p: p5, scheme: ColorScheme) {
        p.background(scheme.background.rgb().array());
        p.noFill();
        p.strokeWeight(1);
        p.stroke(scheme.walls.rgb().array());
        let offset = this.drawingOffset(p.width, p.height);
        let dimension = this.tileDimension(p.width, p.height)
        p.rect(offset.x, offset.y, this.width * dimension, this.height * dimension);
    }
}

export default Field;
