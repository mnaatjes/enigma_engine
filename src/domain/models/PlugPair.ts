/**
 * @file src/domain/models/PlugPair.ts
 */

import type { EnigmaLetter } from "../types/EnigmaTypes.js";
import { EnigmaChar } from "./EnigmaChar.js";

/**
 * @class PlugPair
 */
export class PlugPair{
    private readonly _first: EnigmaChar;
    private readonly _second: EnigmaChar;

    private constructor(first: EnigmaChar, second: EnigmaChar){
        if(first.equals(second)){
            throw new Error(`A PlugPair cannot connect a letter to itself: ${first.letter}`)
        }
        this._first  = first;
        this._second = second;
    }

    /**
     * Returns either the pair (if part of set) or null
     * @returns {EnigmaChar | null}
     */
    public swap(char: EnigmaChar): EnigmaChar | null {
        if(char.equals(this._first)) return this._second;
        if(char.equals(this._second)) return this._first;
        // Default - Not part of pair
        return null;
    }

    /**
     * Pair has given EnigmaChar
     * @returns {bool}
     */
    public contains(char: EnigmaChar): boolean {
        return char.equals(this._first) || char.equals(this._second);
    }

    /**
     * Returns pair as tuple of EnigmaLetters
     */
    public get letters(): [EnigmaLetter, EnigmaLetter] {
        return [this._first.letter, this._second.letter];
    }

    /**
     * @static
     */
    public static fromLetters(l1:string, l2:string): PlugPair {
        return new PlugPair(
            EnigmaChar.fromLetter(l1),
            EnigmaChar.fromLetter(l2)
        );
    }

    /**
     * @static
     */
    public static fromChars(c1:EnigmaChar, c2:EnigmaChar): PlugPair {
        return new PlugPair(c1, c2);
    }
}