/**
 * @file src/domain/types/PhysicsBlueprints.ts
 */

import type { ScramblerWiring, NotchSet, AlphabetIndex, PlugboardPair } from "./PhysicsTypes.js";
/**
 * Rotor Definition: The static blueprint for a physical rotor.
 */
export interface RotorBlueprint {
    readonly wiring: ScramblerWiring;
    readonly notches: NotchSet;
}

/**
 * Reflector Definition: The static blueprint for an Umkehrwalze (UKW).
 */
export interface ReflectorBlueprint {
    readonly wiring: ScramblerWiring;
}

/**
 * Entry Wheel Definition: The static blueprint for an Eintrittwalze (ETW).
 */
export interface EntryWheelBlueprint {
    readonly wiring: ScramblerWiring;
}

/**
 * MachineSetup: The complete set of parameters for a daily configuration.
 * This is the primary contract used to instantiate an EnigmaMachine.
 */
export interface MachineBlueprint {
    /**
     * Walzenlage: The physical rotors in their slots, ordered from Left to Right.
     */
    readonly walzenlage: RotorBlueprint[];
    readonly reflector: ReflectorBlueprint;
    readonly entryWheel: EntryWheelBlueprint;
    /**
     * Ringstellung: Fixed internal offsets for each rotor in the walzenlage.
     */
    readonly ringSetting: AlphabetIndex[];
    /**
     * Grundstellung: Starting window positions for each rotor in the walzenlage.
     */
    readonly grundstellung: AlphabetIndex[];
    /**
     * Steckerverbindungen: The set of cable connections on the plugboard.
     */
    readonly plugboardPairs: PlugboardPair[];
}
