/**
 * @file src/domain/models/Pin.ts
 */
import type { AlphabetIndex } from "../types/EnigmaTypes.js";

export class Pin {
    private readonly _index: AlphabetIndex

    /**
     * @private
     * @param {AlphabetIndex} index
     */
    private constructor(index: AlphabetIndex) {
        this._index = index;
    }

    /**
     * @static
     */
    public static fromIndex(num: number): Pin {
        // Check Input
        if(!Number.isInteger(num)){
            throw new Error(`Value Error: input '${num}' MUST be an integer!`);
        }

        const n = ((num % 26) + 26) % 26;

        return new Pin(n as AlphabetIndex);
    }

    public toIndex(): AlphabetIndex {
        return this._index;
    }

    public shift(offset:number): Pin {
        return Pin.fromIndex(this._index + offset);
    }

    public equals(other: Pin): boolean {
        return this._index === other.toIndex();
    }
}