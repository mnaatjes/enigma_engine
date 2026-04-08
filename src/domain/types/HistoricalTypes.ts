/**
 * @file src/domain/models/HistoricalTypes.ts
 */

import type { EntryWheelBlueprint, MachineBlueprint, ReflectorBlueprint, RotorBlueprint } from "./PhysicsBlueprints.js";

/**
 * The Historical Wiring String
 * A 26-Charater string used only for data ingestion
 */
export type RawWiringString = string;

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

/**
 * Historical Rotor with defined RotorID
 */
export interface HistoricalRotor extends RotorBlueprint {
    readonly id: RotorID;
}

/**
 * Historical Reflector
 */
export interface HistoricalReflector extends ReflectorBlueprint {
    readonly id: ReflectorID;
}

/**
 * Historical Entry Wheel
 */
export interface HistoricalEntryWheel extends EntryWheelBlueprint {
    readonly id: EntryWheelID;
}

/**
 * Historical Machine Setup
 */
export interface HistoricalMachine extends MachineBlueprint {
    readonly id: MachineModelID;
}