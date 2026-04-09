import type { Pin } from "../models/Pin.js";
import type { AlphabetIndex, ScramblerWiring } from "../types/PhysicsTypes.js";

/**
 * @file src/domain/services/IScramblerPhysics.ts
 * The core mathematical engine for Enigma transformations.
 * Implements the "Golden Formula" defined in enigma_mechanics.md.
 */
export interface IScramblerPhysics {
    /**
     * Transforms a signal through a single stage (Rotor, ETW, etc.)
     */
    transform(
        input: Pin,
        wiring: ScramblerWiring,
        position: AlphabetIndex,
        ring: AlphabetIndex
    ): Pin;

    /**
     * Performs the inverse mapping for the return path (R-to-L-to-R).
     */
    inverseTransform(
        input: Pin,
        wiring: ScramblerWiring,
        position: AlphabetIndex,
        ring: AlphabetIndex
    ): Pin;
}