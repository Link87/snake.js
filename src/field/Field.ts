import p5 from 'p5'
import ColorScheme from '../util/Scheme';

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
    render(p: p5, scheme: ColorScheme) {
        p.background(scheme.background.rgb().array());
        // p.noFill();
        // p.strokeWeight(1);
        // p.stroke(scheme.background.rgb().array());
        // p.rect(0, 0, this.width * this.tileDimension, this.height * this.tileDimension);
    }
}

export default Field;
