# Enigma Machine Glossary of Terms

To ensure consistency in our code and documentation, we will use the following historical and technical terms.

## Mechanical Components (Domain Entities)

| German Term | English Term | Description |
| :--- | :--- | :--- |
| **Walzen** | **Rotors / Wheels** | The rotating discs that perform the substitution cipher. Typically 3 or 4 in a machine. |
| **Umkehrwalze (UKW)** | **Reflector** | A fixed (non-rotating) wheel at the end of the rotor stack that "reflects" the signal back through the rotors. |
| **Steckerbrett** | **Plugboard** | The front panel where pairs of letters are swapped before and after the signal passes through the rotors. |
| **Eintrittswalze (ETW)** | **Entry Stator** | The fixed wheel that bridges the plugboard/keyboard to the rotating rotors. |
| **Tastatur** | **Keyboard** | The input mechanism. |
| **Lampenfeld** | **Lampboard** | The output mechanism (light-up letters). |

## Settings & Configuration (Value Objects)

| German Term | English Term | Description |
| :--- | :--- | :--- |
| **Walzenlage** | **Rotor Selection** | The specific rotors chosen for the machine (e.g., I, II, III) and their order (Left, Middle, Right). |
| **Ringstellung** | **Ring Setting** | The internal offset of the alphabet ring relative to the rotor's internal wiring. |
| **Grundstellung** | **Initial Position** | The starting letters visible in the rotor windows (e.g., "ABC"). |
| **Steckerverbindungen** | **Plug Connections** | The pairs of letters connected on the plugboard (e.g., "AM FI NV"). |

## Operational Concepts

| Term | Description |
| :--- | :--- |
| **Schaltklinke (Stepping)** | The mechanical process of a rotor rotating one position. |
| **Notch (Übertragskerbe)** | The physical position on a rotor that triggers the rotor to its left to step. |
| **Double Stepping** | A mechanical quirk where the middle rotor steps twice when it reaches its own notch position. |
| **Reciprocal Cipher** | The property where encryption and decryption are the same operation (A -> X means X -> A). |
