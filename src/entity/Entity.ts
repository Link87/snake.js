import p5 from 'p5'

import Field from '../field/Field'
import ColorScheme from '../util/Scheme';
import { Tile } from '../util/Types'

/**
 * 
 */
export abstract class Entity {
    
    /**
     * @param {Field} field the field on which the entity is placed
     * @param {Tile[]} tiles the tiles the entity initially consists of
     */
    protected constructor(public field: Field, public tiles: Tile[] = []) {
    }
    
    /**
     * 
     */
    abstract render(p: p5, scheme: ColorScheme): void;
}

export default Entity;
