/**
 * @file src/domain/models/EntryWheel.test.ts
 */
import { describe, it, expect } from "vitest";
import type { ScramblerWiring, AlphabetIndex } from "../types/PhysicsTypes.js";
import type { EntryWheelBlueprint } from "../types/PhysicsBlueprints.js";
import { EntryWheel } from "./EntryWheel.js";
import { EnigmaChar } from "./EnigmaChar.js";

describe('EntryWheel Testing', () => {
    /**
     * Entry Wheel Create() method
     */
    describe('EntryWheel.create() Method', () => {
        it('Verifying that a valid blueprint actually creates an instance', () => {
            const validWiring = Array.from({length:26}, (_, i) => i as AlphabetIndex);
            const blueprint: EntryWheelBlueprint = {
                wiring: validWiring
            };
            expect(EntryWheel.create(blueprint)).toBeInstanceOf(EntryWheel);
        });
        it('Has too Few Characters in Wiring', () => {
            expect(() => {
                EntryWheel.create({
                    wiring: Array.from({length:25}, (_,i) => i as AlphabetIndex)
                } as any)
            }).toThrow('EntryWheel Error:');
        });
        it('Has too Many Characters in Wiring', () => {
            expect(() => {
                EntryWheel.create({
                    wiring: Array.from({length:27}, (_,i) => i as AlphabetIndex)
                } as any)
            }).toThrow('EntryWheel Error:');
        });
    });
    /**
     * Implementations by ID-agnostic wiring
     */
    describe('Entrywheel should correctly implement transformations:', () => {
        it('Standard Military (Alphabetical)', () => {
            const militaryBlueprint: EntryWheelBlueprint = {
                wiring: Array.from({length:26}, (_,i) => i as AlphabetIndex)
            };
            const ETW = EntryWheel.create(militaryBlueprint);
            const input = EnigmaChar.fromLetter("Q");
            expect(ETW.forward(input).toIndex()).toBe(16);
        });
    });
    /**
     * Entry Wheel Inverse Logic
     */
    describe('EntryWheel inverse logic', () => {
        it('Round trip invariant for all 26 indices', () => {
            const blueprint: EntryWheelBlueprint = {
                wiring: [16, 22, 4, 17, 19, 25, 20, 8, 14, 0, 18, 3, 5, 6, 7, 10, 15, 24, 23, 2, 21, 1, 13, 12, 11, 9] as AlphabetIndex[]
            };
            const ETW = EntryWheel.create(blueprint);
            for (let i = 0; i < 26; i++){
                const origin = EnigmaChar.fromIndex(i);
                const exitPin = ETW.forward(origin);
                const returnedChar = ETW.backward(exitPin);
                expect(returnedChar.equals(origin)).toBe(true);
                expect(returnedChar.toString()).toBe(origin.toString());
            }
        });
    });
});