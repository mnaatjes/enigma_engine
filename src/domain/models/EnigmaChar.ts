/**
 * @file src/domain/models/EnigmaChar.ts
 */

import { Pin } from "./Pin.js";
import type { EnigmaLetter, AlphabetIndex } from "../types/PhysicsTypes.js";
import { ALPHABET } from "../types/EnigmaConstants.js";

/**
 * EnigmaChar Value Object
 * 
 * Acts as the bridge between human-readable letters ('A'-'Z') 
 * and the internal mechanical indices (0-25). 
 */
export class EnigmaChar {
    private readonly _letter: EnigmaLetter;
    private readonly _index: AlphabetIndex;

    private constructor(letter: EnigmaLetter, index: AlphabetIndex) {
        this._letter = letter;
        this._index = index;
    }

    /**
     * Factory: Validates string (A-Z), normalizes to uppercase, and creates object.
     * @param raw - A single character string 'A'-'Z' or 'a'-'z'.
     */
    public static fromLetter(raw: string): EnigmaChar {
        if (raw.length !== 1) {
            throw new Error(`EnigmaChar Error: input '${raw}' must be a single character.`);
        }

        const upper = raw.toUpperCase();
        const index = ALPHABET.indexOf(upper);

        if (index === -1) {
            throw new Error(`EnigmaChar Error: input '${raw}' is not a valid A-Z character.`);
        }

        return new EnigmaChar(upper as EnigmaLetter, index as AlphabetIndex);
    }

    /**
     * Factory: Validates number (0-25) and finds corresponding letter.
     * @param raw - An integer between 0 and 25.
     */
    public static fromIndex(raw: number): EnigmaChar {
        if (!Number.isInteger(raw) || raw < 0 || raw > 25) {
            throw new Error(`EnigmaChar Error: index '${raw}' must be an integer between 0 and 25.`);
        }

        const letter = ALPHABET[raw] as EnigmaLetter;
        return new EnigmaChar(letter, raw as AlphabetIndex);
    }

    /**
     * Returns the numeric index (0-25).
     */
    public toIndex(): AlphabetIndex {
        return this._index;
    }

    /**
     * Returns the uppercase letter.
     */
    public toString(): string {
        return this._letter;
    }

    /**
     * The Bridge: Converts the character into a 'Pin' for the Scrambler.
     */
    public toPin(): Pin {
        return Pin.fromIndex(this._index);
    }

    /**
     * Standard value object comparison.
     */
    public equals(other: EnigmaChar): boolean {
        return this._index === other.toIndex();
    }
}
