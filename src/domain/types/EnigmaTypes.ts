/**
 * @file src/domain/types/primatives.ts
 * @updated_at 2026-03-28
 */

/**
 * A Single Uppercase Letter
 */
export type EnigmaLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";

/**
 * Numeric index from 0 - 25
 */
export type AlphabetIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;

/**
 * The Historical Wiring String
 * A 26-Charater string used only for data ingestion
 */
export type RawWiringString = string;

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
 * RotorID: Historical identifiers for Enigma rotors.
 */
export type RotorID = "I" | "II" | "III" | "IV" | "V" | "VI" | "VII" | "VIII" | "BETA" | "GAMMA";

/**
 * MachineModelID: Identifiers for the supported Enigma machine models.
 */
export type MachineModelID = "ENIGMA_I" | "KRIEGSMARINE_M3" | "KRIEGSMARINE_M4" | "RAILWAY_ROCKET";

/**
 * Strictly registers the known historical reflectors.
 */
export type ReflectorID = "UKW-A" | "UKW-B" | "UKW-C" | "UKW-B-THIN" | "UKW-C-THIN";

/**
 * Ensures we only support the two historical wiring layouts (Alpha vs. QWERTZ).
 */
export type EntryWheelID = "MILITARY" | "COMMERCIAL";
