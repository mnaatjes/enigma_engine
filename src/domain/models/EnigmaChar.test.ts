/**
 * @file src/domain/models/EnigmaChar.test.ts
 */

import { describe, it, expect } from "vitest";
import { EnigmaChar } from "./EnigmaChar.js";

describe('EnigmaChar', () => {
    // Factory Method
    it("Create Char from Letter", () => {
        const char = EnigmaChar.fromLetter("A");
        expect(char.letter).toBe("A");
        expect(char.index).toBe(0);
    })

    // Wrapping index
    it("Should handle wrapping index", () => {
        expect(EnigmaChar.fromIndex(-1).letter).toBe("Z")
        expect(EnigmaChar.fromIndex(52).letter).toBe("A")
        expect(EnigmaChar.fromIndex(28).letter).toBe("C")
    });

    // Shifting
    it("Should shift correctly", () => {
        const a = EnigmaChar.fromLetter("A")
        expect(a.shift(1).letter).toBe("B")
        expect(a.shift(-1).letter).toBe("Z")
    })
});