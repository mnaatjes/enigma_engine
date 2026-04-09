# Client Interface and API Design

This document outlines how users (and code) will interact with the Enigma machine library.

## 1. Machine Initialization (The Builder Pattern)

The `EnigmaMachine` is a complex object. We should not use a massive constructor. Instead, we'll use a `Builder` or `Factory` to assemble it.

### Proposed API:
```typescript
import { EnigmaBuilder, HistoricalPresets } from 'enigma-engine';

const machine = new EnigmaBuilder()
    .withReflector(HistoricalPresets.REFLECTOR_B)
    .withRotors([
        HistoricalPresets.ROTOR_I,
        HistoricalPresets.ROTOR_II,
        HistoricalPresets.ROTOR_III
    ])
    .withRingSettings(['A', 'B', 'C'])
    .withInitialPositions(['X', 'Y', 'Z'])
    .withPlugboard('AM FI NV')
    .build();
```

## 2. Core Operational Methods

In the historical Enigma, **encryption and decryption are the same operation** because of the Reflector. Therefore, we should have a single `process()` method instead of separate `encrypt()` and `decrypt()` methods.

### Character vs. String:
*   **Domain Level:** The `EnigmaMachine` should expose a `processChar(char: string): string` method. This reflects the physical machine (pressing one key at a time).
*   **Service/Adapter Level:** The `IEnigmaService` (the Port) and the CLI (the Adapter) should expose a `processString(text: string): string` method.

### Example usage:
```typescript
const output = machine.processString("HELLO WORLD");
// In Enigma, non-alphabet characters are usually stripped or ignored.
// Our default should be to ignore them and return only A-Z (uppercase).
```

## 3. The CLI Interface (The "Gateway")

The CLI adapter will allow users to pass settings as flags and the message as an argument or via standard input (stdin).

### Proposed CLI Usage:
```bash
# Encrypt/Decrypt a message with specific settings
enigma-cli --rotors I,II,III --reflector B --rings A,A,B --pos X,Y,Z --plugs "AM FI" "HELLO WORLD"

# Using stdin
echo "HELLO" | enigma-cli --rotors I,II,III --pos XYZ
```

## 4. Hierarchy Summary

| Component | Responsibility |
| :--- | :--- |
| **CLI Adapter** | Parses terminal flags and calls the Inbound Port. |
| **IEnigmaService (Port)** | Interface defining `processString(text, settings)`. |
| **EnigmaMachine (Domain)** | Manages the internal state (rotors, positions) and processes characters. |
| **EnigmaBuilder** | Handles the complex construction and validation of the machine. |
