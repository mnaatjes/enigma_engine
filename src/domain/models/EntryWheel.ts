/**
 * @file src/domain/models/EntryWheel.ts
 */

import { EnigmaChar } from "./EnigmaChar.js";
import { Pin } from "./Pin.js";
import type { ScramblerWiring, AlphabetIndex } from "../types/PhysicsTypes.js";
import type { EntryWheelBlueprint } from "../types/PhysicsBlueprints.js";

/**
 * The Entry Wheel (Eintrittswalze or ETW)
 * 
 * The Entry Wheel is the most misunderstood component of the Enigma machine, 
 * yet it is the critical "Gatekeeper" of the electrical signal.
 * 
 * 1. What is the Entry Wheel?
 * Think of the ETW as a static bridge. It sits between the flexible, 
 * user-configured Plugboard and the rotating Rotor Stack.
 * 
 * Unlike a Rotor:
 * - It does NOT rotate: Its position is fixed (0–25).
 * - It has NO ring setting: It is a single, solid block of wiring.
 * - It has NO notches: It never triggers another component to step.
 */
export class EntryWheel {
    private readonly _wiring: ScramblerWiring;

    private constructor(wiring: ScramblerWiring) {
        this._wiring = wiring;
    }

    /**
     * Static Factory: Creates a new Entry Wheel instance from a blueprint.
     * 
     * @param blueprint - The physical blueprint (EntryWheelBlueprint).
     * @returns A validated EntryWheel instance.
     */
    public static create(blueprint: EntryWheelBlueprint): EntryWheel {
        const { wiring } = blueprint;

        // Validation: Must be 26 elements
        if (wiring.length !== 26) {
            throw new Error(`EntryWheel Error: Wiring must contain exactly 26 elements.`);
        }

        // Validation: Must contain unique indices 0-25
        const seen = new Set<number>();
        for (const index of wiring) {
            if (index < 0 || index > 25 || !Number.isInteger(index)) {
                throw new Error(`EntryWheel Error: Invalid index ${index} in wiring. Must be 0-25.`);
            }
            if (seen.has(index)) {
                throw new Error(`EntryWheel Error: Duplicate index ${index} in wiring.`);
            }
            seen.add(index);
        }

        return new EntryWheel(wiring);
    }

    /**
     * Signal Path (Forward): From Plugboard to Rotor Stack.
     * 
     * @param input - The character coming from the Plugboard.
     * @returns A Pin representing the electrical exit point on the ETW.
     */
    public forward(input: EnigmaChar): Pin {
        const inputIndex = input.toIndex();
        const outputIndex = this._wiring[inputIndex]!;
        return Pin.fromIndex(outputIndex);
    }

    /**
     * Signal Path (Backward): From Rotor Stack to Plugboard.
     * 
     * @param input - The returning electrical signal (Pin).
     * @returns An EnigmaChar representing the character exiting the ETW.
     */
    public backward(input: Pin): EnigmaChar {
        const pinIndex = input.toIndex();
        
        // Find the index of the output value to get the original input index
        const charIndex = this._wiring.indexOf(pinIndex as AlphabetIndex);
        
        if (charIndex === -1) {
            // This should be logically impossible if create() validation passed
            throw new Error(`EntryWheel Error: Inverse mapping failed for Pin index ${pinIndex}.`);
        }

        return EnigmaChar.fromIndex(charIndex);
    }
}
