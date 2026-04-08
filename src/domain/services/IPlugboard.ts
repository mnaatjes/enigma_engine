import type { Pin } from "../models/Pin.js";

/**
 * @file src/domain/services/IPlugboard.ts
 * IPlugboard
 * Manages the reciprocal transposition of characters.
 */
export interface IPlugboard {
    swap(input: Pin): Pin;
    /**
     * Validates the configuration against historical constraints (10 cables)
     */
    validate(): boolean;
}