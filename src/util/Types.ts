/**
 * Defines the directions snakes can walk in.
 * @readonly
 * @enum {number}
 */
export class Direction {
    static readonly NONE = new Direction('NONE', 0, 0);
    static readonly UP = new Direction('UP', 0, -1);
    static readonly RIGHT = new Direction('RIGHT', 1, 0);
    static readonly DOWN = new Direction('DOWN', 0, 1);
    static readonly LEFT = new Direction('LEFT', -1, 0);

    // private to disallow creating other instances of this type
    private constructor(private readonly key: string, public readonly dx: number, public readonly dy: number) {
    }

    toString() {
        return this.key;
    }
}

export type Tile = { x: number, y: number };
