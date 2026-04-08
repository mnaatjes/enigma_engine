/**
 * @file src/domain/types/ObservabilityTypes.ts
 */

import type { EnigmaChar } from "../models/EnigmaChar.js";
import type { Pin } from "../models/Pin.js";
import type { RotorAddress, SignalDirection } from "./PhysicsTypes.js";

/**
 * Stage Indices representing the 9-step signal path defined in directives
 */
export type SignalStageIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * 
 */
export type TraceComponentID = 
    | RotorAddress  // e.g. 0 for 1st rotor
    | "UKW"         // Reflector
    | "ETW"         // Entry Wheel
    | "PLUGBOARD"   // Role
    | "KEYBOARD"    // Starting Point
    | "LAMPBOARD";  // Ending Point

/**
 * Represents the state of the signal at a specific contact point in the path
 */
export interface TraceStep {
    readonly stageIndex: SignalStageIndex;
    readonly componentID: TraceComponentID; // e.g ROTOR_I, PLUGBOARD, etc
    readonly direction: SignalDirection;
    readonly inputPin: Pin; // signal entered on
    readonly outputPin: Pin; // signal exited from
    // The effective mechanical offset (Position - RingSetting) applied at this stage.
    // This is 0 for non-rotating components (Plugboard, UKW, ETW).
    readonly mechanicalOffset: number;
}

/**
 * The complete journey of a single keystroke through the machine.
 */
export interface SignalTrace {
    readonly inputChar: EnigmaChar;
    readonly outputChar: EnigmaChar;
    readonly steps: readonly TraceStep[];
    readonly timestamp: number
}

/**
 * A composite result containing both the final character and its historical trace.
 * This can be used by the Domain Service when 'debug' or 'trace' mode is active.
 */
export interface TraceResult {
    readonly result: EnigmaChar;
    readonly trace: SignalTrace;
}

