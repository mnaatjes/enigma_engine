/**
 * @file src/domain/models/Pin.test.ts
 */
import { describe, it, expect } from "vitest";
import { Pin } from "./Pin.js";

describe("Pin Value Object", () => {
    describe("Creation and Normalization (fromIndex)", () => {
        it("should create a Pin for a valid index (0-25)", () => {
            const pin = Pin.fromIndex(0);
            expect(pin.toIndex()).toBe(0);
            expect(Pin.fromIndex(25).toIndex()).toBe(25);
        });

        it("should normalize positive indices greater than 25", () => {
            expect(Pin.fromIndex(26).toIndex()).toBe(0);
            expect(Pin.fromIndex(52).toIndex()).toBe(0);
            expect(Pin.fromIndex(27).toIndex()).toBe(1);
        });

        it("should normalize negative indices", () => {
            expect(Pin.fromIndex(-1).toIndex()).toBe(25);
            expect(Pin.fromIndex(-26).toIndex()).toBe(0);
            expect(Pin.fromIndex(-27).toIndex()).toBe(25);
        });

        it("should handle large positive and negative numbers", () => {
            expect(Pin.fromIndex(1000).toIndex()).toBe(1000 % 26);
            expect(Pin.fromIndex(-1000).toIndex()).toBe((( -1000 % 26) + 26) % 26);
        });

        it("should throw an error for non-integer inputs", () => {
            expect(() => Pin.fromIndex(1.5)).toThrow("MUST be an integer");
            expect(() => Pin.fromIndex(NaN)).toThrow("MUST be an integer");
        });
    });

    describe("Circular Arithmetic (shift)", () => {
        it("should return a new Pin shifted by a positive amount", () => {
            const pin = Pin.fromIndex(10);
            const shifted = pin.shift(5);
            expect(shifted.toIndex()).toBe(15);
            expect(shifted).not.toBe(pin); // Immutability check
        });

        it("should wrap around correctly when shifting forward", () => {
            const pin = Pin.fromIndex(20);
            expect(pin.shift(10).toIndex()).toBe(4);
        });

        it("should wrap around correctly when shifting backward", () => {
            const pin = Pin.fromIndex(5);
            expect(pin.shift(-10).toIndex()).toBe(21);
        });

        it("should allow chaining shifts", () => {
            const result = Pin.fromIndex(0).shift(10).shift(20).shift(-5);
            expect(result.toIndex()).toBe(25);
        });
    });

    describe("Equality (equals)", () => {
        it("should return true for pins with the same index", () => {
            const pin1 = Pin.fromIndex(5);
            const pin2 = Pin.fromIndex(31); // 31 % 26 = 5
            expect(pin1.equals(pin2)).toBe(true);
        });

        it("should return false for pins with different indices", () => {
            const pin1 = Pin.fromIndex(5);
            const pin2 = Pin.fromIndex(6);
            expect(pin1.equals(pin2)).toBe(false);
        });
    });


});
