/**
 * @file src/domain/exceptions/DomainErrors.ts
 */

/**
 * Base class for all historical and logical violations in the Enigma Engine.
 */
export class EnigmaDomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnigmaDomainError";
    // Ensures the prototype chain is correctly established for custom errors.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when the Plugboard configuration violates reciprocity or capacity.
 */
export class PlugboardValidationError extends EnigmaDomainError {
  constructor(reason: string) {
    super(`Plugboard Violation: ${reason}`);
    this.name = "PlugboardValidationError";
  }
}

/**
 * Thrown when a Reflector (UKW) mapping is mathematically invalid.
 * (e.g., identity mapping or non-reciprocal wiring)
 */
export class ReflectorValidationError extends EnigmaDomainError {
  constructor(id: string, reason: string) {
    super(`Reflector ${id} Violation: ${reason}`);
    this.name = "ReflectorValidationError";
  }
}

/**
 * Thrown when a Rotor's wiring or notch configuration is invalid.
 */
export class RotorValidationError extends EnigmaDomainError {
  constructor(id: string, reason: string) {
    super(`Rotor ${id} Violation: ${reason}`);
    this.name = "RotorValidationError";
  }
}

/**
 * Thrown when trying to use components that are incompatible with the machine model.
 */
export class ConfigurationError extends EnigmaDomainError {
  constructor(model: string, reason: string) {
    super(`Configuration Error for ${model}: ${reason}`);
    this.name = "ConfigurationError";
  }
}

/**
 * Thrown when a character or signal enters the system that is outside historical bounds.
 */
export class SignalError extends EnigmaDomainError {
  constructor(value: string | number) {
    super(`Signal Error: Value '${value}' is outside the 0-25 / A-Z range.`);
    this.name = "SignalError";
  }
}
