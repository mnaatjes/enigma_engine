# Design Doc: Observability & Component Addressing

## Overview
To maintain the **Physics-First Decoupling** of the Enigma Engine, the observability system must record the electrical signal's journey through the machine using **Physical Addresses** rather than **Historical Identities**.

## The Address System (Discriminated Union)
The `ComponentAddress` type is defined as a discriminated union to ensure type safety, consistency, and ease of "Historical Decoration."

### Type Definition
```typescript
export type ComponentAddress = 
    | { kind: "ROTOR"; slot: SlotIndex }
    | { kind: "UKW" }
    | { kind: "ETW" }
    | { kind: "PLUGBOARD" }
    | { kind: "KEYBOARD" }
    | { kind: "LAMPBOARD" };
```

### Architectural Role
1. **The Physics Layer:** The core engine (the "Virgin" machine) generates a `SignalTrace` using these addresses. It does not know if a rotor is named "I" or "BETA"; it only knows the signal is at `slot: 0`.
2. **The Historical Layer:** A "Historical Decorator" or "Factory" takes the `SignalTrace` and the `HistoricalMachineSetup` to map these addresses back to their historical names (e.g., `{ kind: "ROTOR", slot: 0 }` -> "Rotor I").

## Implementation in TraceStep
The `TraceStep` interface uses the `address` property to denote the physical location of the signal at each of the 9 transformation stages.

```typescript
export interface TraceStep {
    readonly stageIndex: SignalStageIndex;
    readonly address: ComponentAddress;
    readonly direction: SignalDirection;
    readonly inputPin: Pin;
    readonly outputPin: Pin;
    readonly mechanicalOffset: number;
}
```

## Benefits
- **Decoupling:** The physics engine remains agnostic of its own history.
- **Extensibility:** New component types or multi-slot configurations can be added by expanding the union.
- **Type Safety:** Exhaustiveness checking in the "Historical Decorator" ensures every physical location is correctly named in reports.
