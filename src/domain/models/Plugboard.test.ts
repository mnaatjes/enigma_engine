/**
 * @file src/domain/models/Plugboard.test.ts
 */
import { describe, it, expect } from "vitest";
import { EnigmaChar } from "./EnigmaChar.js";
import { Plugboard } from "./Plugboard.js";

describe('Plugboard', () => {

    describe('Instantiation', () => {
        it('should create from a valid string and expose pairs', () => {
            const plug = Plugboard.fromString('AB CD EF');
            expect(plug.pairs).toEqual(['AB', 'CD', 'EF']);
        });

        it('should handle extra whitespace and lowercase input', () => {
            const plug = Plugboard.fromString('  ab   cd ');
            expect(plug.pairs).toEqual(['AB', 'CD']);
        });

        it('should create an empty plugboard', () => {
            const plug = Plugboard.empty();
            expect(plug.pairs).toEqual([]);
        });
    });

    describe('Validation', () => {
        it('should throw error for duplicate letters in configuration', () => {
            expect(() => Plugboard.fromString('AB AC')).toThrow(/Letter 'A' is already used/);
        });

        it('should throw error for invalid segment length', () => {
            expect(() => Plugboard.fromString('ABC')).toThrow(/Must have exactly 2 letters/);
            expect(() => Plugboard.fromString('A')).toThrow(/Must have exactly 2 letters/);
        });

        it('should throw error if a letter is plugged to itself', () => {
            // This is actually caught by PlugPair, but should bubble up
            expect(() => Plugboard.fromString('AA')).toThrow(/cannot connect a letter to itself/);
        });
    });

    describe('Process (Signal Path)', () => {
        it('should swap characters in both directions of a pair', () => {
            const plug = Plugboard.fromString('DB FT JK');
            
            // Check B -> D
            const resB = plug.process(EnigmaChar.fromLetter("B"));
            expect(resB.letter).toBe("D");

            // Check D -> B (Reciprocity)
            const resD = plug.process(EnigmaChar.fromLetter("D"));
            expect(resD.letter).toBe("B");
        });

        it('should return the original character if it is not plugged', () => {
            const plug = Plugboard.fromString('AB CD');
            const res = plug.process(EnigmaChar.fromLetter("X"));
            expect(res.letter).toBe("X");
        });

        it('should return the original character for an empty plugboard', () => {
            const plug = Plugboard.empty();
            const res = plug.process(EnigmaChar.fromLetter("A"));
            expect(res.letter).toBe("A");
        });
    });
});
