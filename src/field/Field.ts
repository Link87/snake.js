import p5 from 'p5'

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

export default Field;
