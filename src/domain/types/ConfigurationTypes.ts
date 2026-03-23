/**
 * @files src/domain/types/ConfigurationTypes.ts
 */
import type { EnigmaLetter, WiringString } from "./EnigmaTypes.js"

/**
 * Rotor Configuration Contract
 */
export interface RotorConfiguration {
    readonly id: string
    readonly wiring: WiringString
    readonly notches: EnigmaLetter[] 
}