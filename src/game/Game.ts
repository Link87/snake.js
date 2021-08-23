import p5 from 'p5';
import ColorScheme from '../util/Scheme';

export abstract class Game {

    /**
     * Upates the game. Call this repeatedly in the game loop.
     */
    abstract update(): void;

    /**
     * Renders the game. Call this repeatedly in the game loop.
     */
    abstract render(p: p5, scheme: ColorScheme): void;

    abstract keyCallback(p: p5): () => void;
}

export default Game;
