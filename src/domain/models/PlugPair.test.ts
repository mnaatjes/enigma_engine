/**
 * @file src/domain/models/PlugPair.test.ts
 */
import { describe, it, expect } from "vitest";
import { PlugPair } from "./PlugPair.js";
import { EnigmaChar } from "./EnigmaChar.js";

describe('PlugPair', () => {
    // Test Create
    it('Test instance creation', () => {
        const pair = PlugPair.fromChars(
            EnigmaChar.fromLetter("A"),
            EnigmaChar.fromLetter("C")
        )
        expect(pair.contains(EnigmaChar.fromIndex(0))).toBe(true)
        expect(Array.isArray(pair.letters)).toBe(true)
        expect(pair.swap(EnigmaChar.fromLetter("C"))?.index).toBe(0)
    });
});