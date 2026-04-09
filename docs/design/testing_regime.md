# Testing Regime: Vitest and Colocation

This document outlines the testing strategy for the Enigma Machine project, focusing on reliability, developer experience, and ease of refactoring.

## 1. Testing Framework: Vitest

We have chosen **Vitest** as our primary testing framework. 

### Why Vitest?
- **Fast Execution:** Designed for modern TypeScript/ESM projects.
- **Native TypeScript Support:** No extra transpilation steps or complex configuration.
- **Instant Feedback:** Excellent "watch mode" that re-runs tests immediately upon saving files.
- **Compatible API:** Uses a familiar `describe`, `it`, `expect` syntax, similar to Jest and Pytest.

## 2. Test Placement: Colocation

We follow the practice of **colocating** our unit tests. This means that for every source file, its corresponding unit test file lives in the same directory.

### Example Structure:
```text
src/domain/models/
├── Plugboard.ts        <-- The logic
└── Plugboard.test.ts   <-- The tests
```

### Benefits of Colocation:
1.  **Easier Refactoring:** When you move or rename a component, its tests move with it automatically. No need to maintain a mirrored directory structure.
2.  **Immediate Documentation:** Seeing the test next to the code acts as living documentation on how to use that specific object or class.
3.  **Simpler Imports:** Tests can use direct relative imports (`./Plugboard.js`) rather than complex, brittle paths (`../../../src/...`).

## 3. Writing a Unit Test (Example)

A typical unit test in our project will look like this:

```typescript
import { describe, it, expect } from 'vitest';
import { Plugboard } from './Plugboard.js';

describe('Plugboard', () => {
  it('should swap two characters that are plugged together', () => {
    // 1. Setup (Arrange)
    const plugboard = new Plugboard("AZ"); 

    // 2. Action (Act)
    const resultA = plugboard.process("A");
    const resultZ = plugboard.process("Z");

    // 3. Assertion (Assert)
    expect(resultA).toBe("Z");
    expect(resultZ).toBe("A");
  });

  it('should return the original character if no plug is present', () => {
    const plugboard = new Plugboard("AZ");
    expect(plugboard.process("B")).toBe("B");
  });
});
```

## 4. Test Execution

- **Development (Watch Mode):** `npm test`
- **Single Run (CI/Build):** `npm run test:run`
- **Visual Dashboard:** `npm run test:ui`

## 5. Integration vs. Unit Tests

- **Unit Tests (Colocated):** Focused on individual components (`Rotor`, `Plugboard`).
- **Integration Tests (Top-level `tests/`):** Focused on testing the "Hexagon" as a whole or its interaction with adapters. These are placed in a dedicated top-level directory as they span across multiple files and layers.
