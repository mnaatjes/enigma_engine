# Enigma Engine: Derived Mechanical & Cryptographic Truth

This document serves as the definitive technical baseline for the Enigma Engine implementation, resolving discrepancies found across historical and algorithmic sources.

## 1. Core Temporal Rule: Step-then-Encrypt
The mechanical rotation of the rotors occurs **immediately** upon key depression and **before** the electrical signal is sent through the circuit. 
*   *Implementation:* The `step()` method of the `EnigmaMachine` must be called at the start of every `encrypt(char)` request.

## 2. Stepping Logic (Standard M3)
The stepping mechanism is driven by three spring-loaded pawls.
*   **Right Rotor (Fast):** Always steps exactly once per keypress.
*   **Middle Rotor (Middle):**
    1.  Steps if the **Right** rotor was at its notch position.
    2.  Steps a **second time** (Double-Step) if it is currently at its **own** notch position.
*   **Left Rotor (Slow):** Steps only if the **Middle** rotor was at its notch position.

### Notch vs. Turnover
A notch at 'Q' (Index 16) means the turnover triggers as the rotor moves **from Q to R**.

## 3. Electrical Signal Path (9-Step Sequence)
The electrical signal undergoes nine discrete transformations:
1.  **Plugboard (Forward):** Swaps the input letter (transposition).
2.  **Right Rotor (Forward):** First scrambling stage.
3.  **Middle Rotor (Forward):** Second scrambling stage.
4.  **Left Rotor (Forward):** Third scrambling stage.
5.  **Reflector (UKW):** Involutory swap (Non-identity).
6.  **Left Rotor (Reverse):** Inverse scramble.
7.  **Middle Rotor (Reverse):** Inverse scramble.
8.  **Right Rotor (Reverse):** Inverse scramble.
9.  **Plugboard (Reverse):** Final swapping.

## 4. Mathematical Formula (Offset Logic)
The effective "scramble" is a combination of the rotor's current **Position** and its fixed **Ring Setting (Ringstellung)**.
*   **Neutral Point:** 'A' (Index 0).
*   **Offset Formula:** `Offset = (PositionIndex - RingSettingIndex)`
*   **Forward Map:** `Output = (Wiring[(Input + Offset) % 26] - Offset) % 26`
*   **Backward Map:** `Output = (InverseWiring[(Input + Offset) % 26] - Offset) % 26`

## 5. Definitive Component Specifications

### Rotors (Wiring & Notch)
| ID | Wiring (Right-to-Left) | Notch |
| :--- | :--- | :--- |
| **I** | `EKMFLGDQVZNTOWYHXUSPAIBRCJ` | Q |
| **II** | `AJDKSIRUXBLHWTMCQGZNPYFVOE` | E |
| **III** | `BDFHJLCPRTXVZNYEIWGAKMUSQO` | V |
| **IV** | `ESOVPZJAYQUIRHXLNFTGKDCMWB` | J |
| **V** | `VZBRGITYUPSDNHLXAWMJQOFECK` | Z |
| **VI** | `JPGVOUMFYQBENHZRDKASXLICTW` | Z, M |
| **VII** | `NZJHGRCXMYSWBOUFAIVLPEKQDT` | Z, M |
| **VIII** | `FKQHTLXOCBJSPDZRAMEWNIUYGV` | Z, M |

### Reflectors (UKW)
*   **UKW-B:** `YRUHQSLDPXNGOKMIEBFZCWVJAT`
*   **UKW-C:** `FVPJIAOYEDRZXWGCTKUQSBNMHL`

### Entry Wheels (ETW)
*   **Military:** `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
*   **Commercial:** `QWERTZUIOASDFGHJKPYXCVBNML`

## 6. Cryptographic Invariants
Every valid Enigma implementation must satisfy these properties:
*   **Non-Identity:** No letter can ever map to itself.
*   **Reciprocity:** If setting `S` maps `A` to `G`, then setting `S` must also map `G` to `A`.
*   **Self-Inverse:** Encryption and Decryption are identical processes.
