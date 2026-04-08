/**
 * @file src/domain/models/EnigmaChar.test.ts
 */

import { describe, it, expect } from "vitest";
import { EnigmaChar } from "./EnigmaChar.js";
import { Pin } from "./Pin.js";

describe("EnigmaChar Value Object", () => {
    describe("Factory: fromLetter", () => {
        it("should create EnigmaChar from valid uppercase letter", () => {
            const char = EnigmaChar.fromLetter("A");
            expect(char.toString()).toBe("A");
            expect(char.toIndex()).toBe(0);
        });

        it("should normalize lowercase letter to uppercase", () => {
            const char = EnigmaChar.fromLetter("z");
            expect(char.toString()).toBe("Z");
            expect(char.toIndex()).toBe(25);
        });

        it("should throw error for invalid character", () => {
            expect(() => EnigmaChar.fromLetter("!")).toThrow("not a valid A-Z character");
            expect(() => EnigmaChar.fromLetter("1")).toThrow("not a valid A-Z character");
            expect(() => EnigmaChar.fromLetter(" ")).toThrow("not a valid A-Z character");
        });

        it("should throw error for empty string or multiple characters", () => {
            expect(() => EnigmaChar.fromLetter("")).toThrow("must be a single character");
            expect(() => EnigmaChar.fromLetter("AB")).toThrow("must be a single character");
        });
    });

    describe("Factory: fromIndex", () => {
        it("should create EnigmaChar from valid index", () => {
            const char = EnigmaChar.fromIndex(0);
            expect(char.toString()).toBe("A");
            expect(char.toIndex()).toBe(0);

            const char2 = EnigmaChar.fromIndex(25);
            expect(char2.toString()).toBe("Z");
            expect(char2.toIndex()).toBe(25);
        });

        it("should throw error for out-of-range index", () => {
            expect(() => EnigmaChar.fromIndex(-1)).toThrow("must be an integer between 0 and 25");
            expect(() => EnigmaChar.fromIndex(26)).toThrow("must be an integer between 0 and 25");
        });

        it("should throw error for non-integer index", () => {
            expect(() => EnigmaChar.fromIndex(1.5)).toThrow("must be an integer between 0 and 25");
            expect(() => EnigmaChar.fromIndex(NaN)).toThrow("must be an integer between 0 and 25");
        });
    });

    describe("Conversion: toPin", () => {
        it("should convert EnigmaChar to a Pin object with the same index", () => {
            const char = EnigmaChar.fromLetter("M");
            const pin = char.toPin();
            
            expect(pin).toBeInstanceOf(Pin);
            expect(pin.toIndex()).toBe(12);
        });
    });

    describe("Equality: equals", () => {
        it("should return true for identical characters regardless of creation method", () => {
            const char1 = EnigmaChar.fromLetter("A");
            const char2 = EnigmaChar.fromIndex(0);
            expect(char1.equals(char2)).toBe(true);
        });

        it("should return false for different characters", () => {
            const char1 = EnigmaChar.fromLetter("A");
            const char2 = EnigmaChar.fromLetter("B");
            expect(char1.equals(char2)).toBe(false);
        });
    });

    describe("Edge Cases", () => {
        it("should handle the full range of the alphabet", () => {
            for (let i = 0; i < 26; i++) {
                const char = EnigmaChar.fromIndex(i);
                expect(char.toIndex()).toBe(i);
                expect(EnigmaChar.fromLetter(char.toString()).toIndex()).toBe(i);
            }
        });
    });
});
