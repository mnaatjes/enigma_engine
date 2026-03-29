/**
 * @file src/domain/types/ConfigurationTypes.ts
 */
import type { 
    RotorID, 
    ScramblerWiring, 
    NotchSet, 
    AlphabetIndex, 
    EntryWheelID, 
    ReflectorID, 
    MachineModelID 
} from "./EnigmaTypes.js";

/**
 * Rotor Definition: The static blueprint for a physical rotor.
 */
export interface RotorDefinition {
    readonly id: RotorID;
    readonly wiring: ScramblerWiring;
    readonly notches: NotchSet;
}

/**
 * Reflector Definition: The static blueprint for an Umkehrwalze (UKW).
 */
export interface ReflectorDefinition {
    readonly id: ReflectorID;
    readonly wiring: ScramblerWiring;
}

/**
 * Entry Wheel Definition: The static blueprint for an Eintrittwalze (ETW).
 */
export interface EntryWheelDefinition {
    readonly id: EntryWheelID;
    readonly wiring: ScramblerWiring;
}

/**
 * PlugboardPair: A utility type for a single reciprocal cable connection.
 */
export type PlugboardPair = [AlphabetIndex, AlphabetIndex];

/**
 * MachineSetup: The complete set of parameters for a daily configuration.
 * This is the primary contract used to instantiate an EnigmaMachine.
 */
export interface MachineSetup {
    readonly model: MachineModelID;
    /**
     * Walzenlage: The physical rotors in their slots, ordered from Left to Right.
     */
    readonly walzenlage: RotorDefinition[];
    readonly reflector: ReflectorDefinition;
    readonly entryWheel: EntryWheelDefinition;
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
