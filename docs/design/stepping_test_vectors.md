# Stepping and Double-Stepping Test Vectors

This document provides a normalized reference for rotor stepping sequences, including the "Double Step" quirk. These sequences serve as a source of truth for our unit and integration tests.

## 1. Test Configuration

The following sequences assume a 3-rotor Enigma I / M3 configuration:
- **Rotors:** I (Left), II (Middle), III (Right)
- **Notches:** I: Q, II: E, III: V
- **Ring Settings:** All set to 'A' (01)

## 2. Normal Stepping Sequence
In a normal sequence, the right rotor steps every time. The middle rotor only steps when the right rotor moves *off* its notch (**V to W**).

| Step | Position (L M R) | Description |
| :--- | :--- | :--- |
| 0 | `A A U` | Initial state. |
| 1 | `A A V` | Right rotor moves to its notch position. |
| 2 | **`A B W`** | Right rotor moves off notch (**V->W**), triggering Middle rotor (**A->B**). |
| 3 | `A B X` | Normal step of right rotor. |

## 3. Double-Stepping Sequence
Double-stepping occurs when the Middle rotor is already on its notch (**E**) when the Right rotor moves off its notch. This causes the Middle rotor and the Left rotor to step simultaneously.

| Step | Position (L M R) | Description |
| :--- | :--- | :--- |
| 0 | `A D U` | Initial state. |
| 1 | `A D V` | Right rotor moves to its notch position (**V**). |
| 2 | **`A E W`** | Right rotor moves off notch (**V->W**), triggers Middle rotor to its notch (**D->E**). |
| 3 | **`B F X`** | Right rotor steps normally. Middle rotor was on notch (**E**), so it steps (**E->F**) AND triggers Left rotor (**A->B**). |
| 4 | `B F Y` | Normal step of right rotor. |

## 4. Why this matters for implementation
*   **Order of Operations:** Stepping must happen *before* the electrical signal passes through the machine.
*   **The "Double Step" Quirk:** Notice in Step 3 of the Double Step sequence that the Middle rotor moves even though the Right rotor didn't just pass a notch. It moves because *it* was on a notch when the Right rotor stepped.
*   **Reciprocity:** These sequences must be reproducible in our `EnigmaMachine.step()` logic to ensure historical accuracy.
