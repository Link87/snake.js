import p5 from "p5";
import * as _ from 'lodash'

import Field from "../field/Field";
import { Tile } from "../util/Types";
import Entity from "./Entity";

/**
 * A treat that can be collected and lets the collecting snake grow.
 * @constructor
 * @param {Field} field the field the treat is positioned on
 * @param {Snake} entities the game entities that own tiles
 */
export class Treat extends Entity {

    constructor(public field: Field) {
        super(field, [{ x: 10, y: 10 }]);
    }

    regenerate(...entities: Entity[]) {
        // repeat until no overlap with existing entity
        while(true) {
            this.tile.x = _.toInteger(Math.random() * this.field.width);
            this.tile.y = _.toInteger(Math.random() * this.field.height);
            for (let entity of entities) {
                for (let tile of entity.tiles) {
                    if (this.tile.x === tile.x && this.tile.y === tile.y) {
                        continue; // there is an overlap -> repeat
                    }
                }
            }
            break; // no overlap -> use this position
        }
    }

    render(p: p5) {
        p.fill(255, 0, 0);
        p.noStroke();
        p.square(this.tile.x * this.field.tileDimension,
            this.tile.y * this.field.tileDimension,
            this.field.tileDimension);
    }

    get tile() {
        return this.tiles[0];
    }

    set tile(tile: Tile) {
        this.tiles = [tile];
    }

}

export default Treat;
