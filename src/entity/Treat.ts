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
        // generate boolean-list with `true` representing occupied and `false` free tiles
        let occupiedTiles: boolean[] = Array(this.field.width * this.field.height);
        _.fill(occupiedTiles, false, 0, this.field.width * this.field.height - 1);
        for (let entity of entities) {
            for (let tile of entity.tiles) {
                occupiedTiles[tile.y * this.field.width + tile.x] = true; //row-first
            }
        }
        
        // generate random index in the domain of free tiles
        let freeTileCount = _.countBy(occupiedTiles).false;
        let randomIndex = _.toInteger(Math.random() * freeTileCount);

        // find the tile with the generated index
        outer: for (let x of _.range(this.field.width)) {
            for (let y of _.range(this.field.height)) {
                if (!occupiedTiles[y * this.field.width + x]) {
                    randomIndex--;
                    if (randomIndex <= 0) {
                        this.tile.x = x;
                        this.tile.y = y;
                        break outer;
                    }
                }
            }
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
