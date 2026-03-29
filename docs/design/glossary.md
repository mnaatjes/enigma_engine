# Enigma Engine Glossary

## Mechanical Components

### Eintrittswalze (ETW) / Entry Wheel
The fixed interface between the plugboard and the rotor stack. 
*   **Naval ETW:** Alphabetical wiring (A=A, B=B...).

### Walzen / Rotors
The primary scrambling units. 
*   **Window Letter:** The letter (A-Z) currently visible in the machine's display window. It represents the **Current Position** of the rotor core relative to the machine's casing.
*   **Ring Setting (Ringstellung):** The fixed angular offset between the internal wiring core and the external alphabet ring. This is a static configuration set before encryption.
*   **Notch:** The physical indentation on the ring that triggers the stepping of the adjacent rotor.

### Umkehrwalze (UKW) / Reflector
A static component at the end of the rotor stack. 
*   **Involutory Property:** The reflector ensures the machine is self-inverse (encryption and decryption are identical).
*   **Non-Identity:** The reflector prevents any letter from mapping to itself.

### Steckerbrett / Plugboard
A manual patch panel that performs reciprocal letter swapping (transposition).

## Logic & Signals

### Signal (AlphabetIndex)
In this engine, a **Signal** is definitively an **integer value (0-25)** representing the electrical path through a physical pin or contact. 

### Signal Path (R-to-L-to-R)
1.  **Forward Pass (Right to Left):** The signal enters the **Right (pin)** side of a rotor and exits the **Left (pad)** side.
2.  **Reflection:** The UKW swaps the signal and sends it back.
3.  **Backward Pass (Left to Right):** The signal enters the **Left (pad)** side and exits the **Right (pin)** side (Inverse Mapping).

### Temporal Distinction (Step-then-Encrypt)
The mechanical rotation of the rotors occurs **immediately upon key depression** and **strictly before** the electrical signal is energized. The `Window Letter` updates *before* the lampboard reflects the result.

### Offset
The resultant electrical shift used during encryption calculations.
**Formula:** `Offset = (PositionIndex - Ring SettingIndex)`.
