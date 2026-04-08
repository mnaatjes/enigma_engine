# The Philosophy of Electrical Blindness

This document preserves the conceptual breakthrough regarding the separation of **Information** (Letters) and **Electricity** (Pins) in the Enigma Engine.

## 1. The "Information-to-Electricity" Bridge
The journey of a signal begins with a human intent (pressing a key). This intent is "Information."

*   **Keyboard Input:** "I want to encrypt the letter 'A'."
*   **Internal Index:** In our system, 'A' is mapped to `Index 0`.
*   **The ETW Transformation:** The Entry Wheel (ETW) acts as the bridge. For a Commercial Enigma, it maps `Index 0` (A) to `Index 16` (Q).

## 2. The State of "Blindness"
Once the signal leaves the Entry Wheel as `Pin(index: 16)`, it enters a state of **Electrical Blindness**.

*   **No Information:** The `Pin` object does not know it started as "A". It does not know it represents "Q" on a static alphabet.
*   **Pure Coordinate:** It is simply "Electricity at the 16th physical contact point."
*   **Component Agnostic:** The Pin doesn't care if the component it hits next is a Rotor, a Reflector, or a Plugboard. It only knows its physical location (0-25) in the circuit.

## 3. Why This Matters for the Scrambler
The Scrambler (the Rotor stack) is **Dynamic**. The rotors are spinning and have internal offsets (Ring Settings).

*   If the system tried to "remember" that the pin was "A", the math would become impossibly complex.
*   By treating the signal as a "Blind Pin," the **Scrambler Physics** only has to solve one problem: *"If electricity enters at physical location 16, and the rotor has turned by 3 positions, which internal wire does it hit?"*

## 4. The Return of Meaning
The electricity only regains its "Meaning" (becoming an `EnigmaChar` again) at the very end of the 9-step journey.

1.  The signal travels back through the rotors.
2.  It hits the **ETW in Reverse**.
3.  The ETW "Reverse-Maps" the physical contact point (e.g., Pin 4) back to a letter (e.g., 'E').
4.  The Lampboard displays the letter 'E'.

**Core Law:** Within the Hexagon, we speak in **Pins**. At the boundaries, we speak in **Chars**.
