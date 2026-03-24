/**
 * @file src/domain/models/Plugboard.ts
 */
import { EnigmaChar } from "./EnigmaChar.js";
import { PlugPair } from "./PlugPair.js";

/**
 * The Plugboard (Steckerbrett) handles the initial and final character swaps.
 * It is a collection of mutually exclusive PlugPairs that performs reciprocal substitutions.
 */
export class Plugboard {
    private readonly _pairs: PlugPair[]

    /**
     * @param pairs - An array of PlugPair objects. Private to enforce factory usage.
     */
    private constructor(pairs: PlugPair[]) {
        // Validate no duplicate EnigmaLetters used in pairs
        this._validate_exclusivity(pairs);
        this._pairs = pairs;
    }

    /**
     * Internal validation: Ensures no single letter is connected to more than one partner.
     * @param pairs - The array of pairs to validate.
     * @throws {Error} If a duplicate letter is found across the configuration.
     */
    private _validate_exclusivity(pairs: PlugPair[]): void {
        const seen = new Set<string>();
        for (const letter of pairs.flatMap(p => p.letters)) {
            if (seen.has(letter)) {
                throw new Error(`Invalid Plugboard: Letter '${letter}' is already used in a PlugPair!`)
            }
            seen.add(letter);
        }
    }

    /**
     * Factory: Create a Plugboard from a space-separated string of pairs (e.g., "AB CD EF").
     * @param pairsStr - A string representing the plug connections.
     * @returns A new validated Plugboard instance.
     * @throws {Error} If any segment is not exactly 2 letters or contains duplicate connections.
     */
    public static fromString(pairsStr: string): Plugboard {
        const segments = pairsStr.toUpperCase().split(/\s+/).filter(s => s.length > 0);
        const pairs = segments.map((s) => {
            if (s.length !== 2) {
                throw new Error(`Invalid Plugboard Segment: '${s}' Must have exactly 2 letters!`);
            }
            return PlugPair.fromLetters(s[0]!, s[1]!);
        });
        return new Plugboard(pairs);
    }

    /**
     * Factory: Create an empty Plugboard with no connections.
     * @returns A Plugboard that returns all characters unchanged.
     */
    public static empty(): Plugboard {
        return new Plugboard([]);
    }

    /**
     * Returns an array of strings representing the currently plugged pairs (e.g., ["AB", "CD"]).
     */
    public get pairs(): string[] {
        return this._pairs.map((p) => p.letters.join(''));
    }

    /**
     * Processes a character through the plugboard.
     * If the character is part of a pair, it returns its partner; otherwise, returns the original character.
     * @param char - The EnigmaChar to process.
     * @returns The swapped (or original) EnigmaChar.
     */
    public process(char: EnigmaChar): EnigmaChar {
        for (const pair of this._pairs) {
            const swapped = pair.swap(char);
            if (swapped) {
                return swapped;
            }
        }
        return char;
    }
}
