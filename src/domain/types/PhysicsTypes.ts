/**
 * @file src/domain/models/PhysicsTypes.ts
 */

/**
 * Numeric index from 0 - 25
 */
export type AlphabetIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;

/**
 * Scrambler Wiring - The mechanical truth
 * A readonly array of 26 AlphabetIndices
 */
export type ScramblerWiring = readonly AlphabetIndex[];

/**
 * Supports Multiple notches (Naval IV-VIII Rotors)
 */
export type NotchSet = readonly AlphabetIndex[];

/**
 * Signal Direction: To handle the two-way passing of signal
 */
export type SignalDirection = "FORWARD" | "BACKWARD";

/**
 * A Single Uppercase Letter
 */
export type EnigmaLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

/**
 * PlugboardPair: A utility type for a single reciprocal cable connection.
 */
export type PlugboardPair = [AlphabetIndex, AlphabetIndex];

/**
 * SlotIndex: Represents the indexed location of the rotor 
 * - Starting right to left
 * - Indexed to 0
 */
export type SlotIndex = 0 | 1 | 2 | 3;

/**
 * Rotor Position within system
 */
export interface RotorAddress {
    readonly slot: SlotIndex;
}