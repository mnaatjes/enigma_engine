/**
 * @file src/ports/inbound/IRotor.ts
 */
import { EnigmaChar } from "../../domain/models/EnigmaChar.js";

/**
 * The IRotor interface defines the behavior contract for an Enigma Rotor.
 * This ensures that any implementation of a Rotor (Standard, M4, etc.) 
 * can be swapped interchangeably in the RotorStack.
 */
export interface IRotor {
    /**
     * The unique identifier for the rotor (e.g., "I", "II", "Beta").
     */
    readonly id: string;

    /**
     * The current rotational position of the rotor (0-25).
     */
    readonly position: number;

    /**
     * Rotates the rotor by one step (1/26th of a turn).
     */
    step(): void;

    /**
     * Checks if the rotor is currently at its notch position.
     * This triggers the stepping of the next rotor in the stack.
     * @returns True if the rotor is at a notch.
     */
    atNotch(): boolean;

    /**
     * Maps an incoming signal (Right to Left) through the rotor's wiring.
     * Accounts for the rotor's current position and ring setting.
     * @param char - The incoming character.
     * @returns The transformed character.
     */
    forward(char: EnigmaChar): EnigmaChar;

    /**
     * Maps a returning signal (Left to Right) through the rotor's wiring.
     * This is the inverse of the forward mapping.
     * @param char - The returning character.
     * @returns The transformed character.
     */
    backward(char: EnigmaChar): EnigmaChar;
}
