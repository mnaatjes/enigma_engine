# Enigma Machine Glossary & Canonical Terms

This document defines the primary terminology used in our code and documentation. We strictly adhere to English-language terms to ensure consistency.

## 1. Canonical Terms (Project Standard)

The following terms are the **only** ones permitted in class names, variables, and public APIs.

| Canonical Term | Description | Replaces (Historical/German) |
| :--- | :--- | :--- |
| **Rotors** | The rotating discs that perform substitution. | *Walzen*, Wheels |
| **Reflector** | The fixed wheel at the end of the stack. | *Umkehrwalze (UKW)* |
| **Plugboard** | The front panel for character swaps. | *Steckerbrett* |
| **Ring Setting** | Internal offset of the alphabet ring. | *Ringstellung* |
| **Initial Position** | The letters visible in the rotor windows. | *Grundstellung* |
| **Stepping / Notch** | The mechanical rotation and trigger points. | *Schaltklinke / Kerbe* |

## 2. Mechanical Components (Domain Entities)

| Term | Historical Context | Description |
| :--- | :--- | :--- |
| **Rotors** | *Walzen* | Typically 3 or 4 in a machine. They rotate to change the cipher. |
| **Reflector** | *Umkehrwalze* | Sends the signal back through the rotors; prevents letters mapping to themselves. |
| **Plugboard** | *Steckerbrett* | Swaps pairs of letters before and after the rotor sequence. |
| **Entry Stator** | *Eintrittswalze* | The fixed bridge between the plugboard and the first rotor. |
| **Keyboard** | *Tastatur* | The input mechanism. |
| **Lampboard** | *Lampenfeld* | The output display (A-Z lights). |

## 3. Configuration & Settings (Value Objects)

| Term | Historical Context | Description |
| :--- | :--- | :--- |
| **Rotor Selection** | *Walzenlage* | The specific rotors chosen (e.g., I, II, III) and their Left-to-Right order. |
| **Ring Setting** | *Ringstellung* | Adjusts the internal wiring relative to the notch. |
| **Initial Position** | *Grundstellung* | The starting "key" for a message (e.g., "MCK"). |
| **Plug Connections** | *Steckerverbindungen* | The specific pairs connected on the plugboard (e.g., "AM FI"). |

## 4. Operational Concepts

| Term | Description |
| :--- | :--- |
| **Stepping** | The physical rotation of a rotor by one position (1/26th of a turn). |
| **Notch** | The point on a rotor's ring that causes the adjacent rotor to step. |
| **Double Stepping** | A mechanical quirk where the middle rotor steps twice in consecutive turns. |
| **Reciprocal Cipher** | A property where the encryption and decryption processes are identical. |
