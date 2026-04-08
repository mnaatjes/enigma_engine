/**
 * @file src/domain/types/UtilityTypes.ts
 */
import type { AlphabetIndex, ScramblerWiring } from "./PhysicsTypes.js";

/**
 * A Mapping pair for internal transformation logic.
 */
export interface PinMapping {
    readonly input: AlphabetIndex;
    readonly output: AlphabetIndex;
}

/**
 * A validation report for a component's wiring core.
 * Ensures a wiring string is a complete permutation of 26 unique characters.
 */
export interface WiringValidation {
    readonly isValid: boolean;
    readonly missingIndices: readonly AlphabetIndex[];
    readonly duplicateIndices: readonly AlphabetIndex[];
}

/**
 * Represents a bi-directional mapping between two alphabet indices.
 * Useful for the Plugboard and Reflector (UKW) where reciprocity is required.
 */
export interface ReciprocalMapping {
    readonly a: AlphabetIndex;
    readonly b: AlphabetIndex;
}

/**
 * A result object for a bulk wiring transformation (String -> ScramblerWiring).
 */
export interface WiringTransformationResult {
    readonly wiring: ScramblerWiring;
    readonly inverseWiring: ScramblerWiring;
    readonly validation: WiringValidation;
}
