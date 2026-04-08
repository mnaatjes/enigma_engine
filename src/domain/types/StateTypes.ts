/**
 * @file src/domain/types/StateTypes.ts
 */

import type { AlphabetIndex, EnigmaLetter, SlotIndex } from "./PhysicsTypes.js";
/**
 * The dynamic state of a single, physical rotor
 */
export interface RotorState {
    readonly slotIndex: SlotIndex;
    readonly position: AlphabetIndex;   // Internal 0-25
    readonly windowLetter: EnigmaLetter; // Human-readable A-Z
}

/**
 * The mechanical triggers for a rotor movement.
 */
export type SteppingReason = 
| "NORMAL"      // Right rotor stepping
| "TURNOVER"    // Stepped - neighbor at notch
| "DOUBLE_STEP" // Middle Rotor Stepped 
| "STATIONARY"; // Did NOT Step (e.g. 4th rotor in M4)

/**
 * A snapshot of the entire mechanical stack.
 */
export interface MachineState {
    readonly rotorStates: readonly RotorState[];
    readonly plugboardCount: number; // Number of active cables
    readonly timestamp: number;
}

/**
 * Captures the 'Delta' of a mechanical stepping event.
 * Crucial for validating Double-Step logic.
 */
export interface SteppingResult {
    readonly leftStepped: boolean;
    readonly middleStepped: boolean;
    readonly rightStepped: boolean;
    // Maps rotor specific logic
    readonly reasons: {
        readonly left: SteppingReason;
        readonly middle: SteppingReason;
        readonly right: SteppingReason;
    }
}