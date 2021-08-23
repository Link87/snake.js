import p5 from "p5";
import _ from 'lodash'

import Field from "../field/Field";
import { Tile } from "../util/Types";
import Entity from "./Entity";
import ColorScheme from "../util/Scheme";

export class Wall extends Entity {

    constructor(public field: Field, corner1: Tile, corner2: Tile) {
        super(field);
        for (let x of _.range(corner1.x, corner2.x + 1)) {
            for (let y of _.range(corner1.y, corner2.y + 1)) {
                this.tiles.push({ x, y });
            }
        }
    }

    render(p: p5, scheme: ColorScheme) {
        p.fill(scheme.walls.rgb().array());
        p.stroke(scheme.walls.rgb().array());
        p.strokeWeight(1);
        let offset = this.field.drawingOffset(p.width, p.height);
        let dimension = this.field.tileDimension(p.width, p.height)
        for (let tile of this.tiles) {
            p.square(
                offset.x + tile.x * dimension,
                offset.y + tile.y * dimension,
                dimension
            );
        }
    }

    get tile() {
        return this.tiles[0];
    }

    set tile(tile: Tile) {
        this.tiles = [tile];
    }

}

export default Wall;
