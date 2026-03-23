# Historical Presets and Configuration Data

This document serves as the official reference for historical Enigma machine components, including their internal wiring, stepping mechanisms, and model-specific metadata.

## 1. The Standard Alphabet

All encryption operations are based on the standard 26-letter Latin alphabet.

| Reference | Sequence |
| :--- | :--- |
| **ALPHABET** | `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z` |

## 2. Rotor Configurations (Walzen)

Rotors consist of a static internal wiring and a specific "notch" position that triggers the stepping of the rotor to its left.

### Standard Military (Enigma I, M3, M4)
Used by the German Wehrmacht, Luftwaffe, and Kriegsmarine.

| ID | Wiring (A -> Z) | Notch | Date Introduced | Model Name & Number |
| :--- | :--- | :--- | :--- | :--- |
| **I** | `EKMFLGDQVZNTOWYHXUSPAIBRCJ` | **Q** | 1930 | Enigma I |
| **II** | `AJDKSIRUXBLHWTMCQGZNPYFVOE` | **E** | 1930 | Enigma I |
| **III** | `BDFHJLCPRTXVZNYEIWGAKMUSQO` | **V** | 1930 | Enigma I |
| **IV** | `ESOVPZJAYQUIRHXLNFTGKDCMWB` | **J** | Dec 1938 | M3 Army |
| **V** | `VZBRGITYUPSDNHLXAWMJQOFECK` | **Z** | Dec 1938 | M3 Army |
| **VI** | `JPGVOUMFYQBENHZRDKASXLICTW` | **Z, M** | 1939 | M3 & M4 Naval |
| **VII** | `NZJHGRCXMYSWBOUFAIVLPEKQDT` | **Z, M** | 1939 | M3 & M4 Naval |
| **VIII** | `FKQHTLXOCBJSPDZRAMEWNIUYGV` | **Z, M** | 1939 | M3 & M4 Naval |

### Commercial and Specialty Models

| ID | Wiring (A -> Z) | Notch | Date Introduced | Model Name & Number |
| :--- | :--- | :--- | :--- | :--- |
| **IC** | `DMTWSILRUYQNKFEJCAZBPGXOHV` | — | 1924 | Commercial A, B |
| **IIC** | `HQZGPJTMOBLNCIFDYAWVEUSRKX` | — | 1924 | Commercial A, B |
| **IIIC** | `UQNTLSZFMREHDPXKIBVYGJCWOA` | — | 1924 | Commercial A, B |
| **I-K** | `PEZUOHXSCVFMTBGLRINQJWAYDK` | — | Feb 1939 | Swiss K |
| **II-K** | `ZOUESYDKFWPCIQXHMVBLGNJRAT` | — | Feb 1939 | Swiss K |
| **III-K** | `EHRVXGAOBQUSIMZFLYNWKTPDJC` | — | Feb 1939 | Swiss K |
| **I** | `JGDQOXUSCAMIFRVTPNEWKBLZYH` | — | 7 Feb 1941 | German Railway (Rocket) |
| **II** | `NTZPSFBOKMWRCJDIVLAEYUXHGQ` | — | 7 Feb 1941 | German Railway (Rocket) |
| **III** | `JVIUBHTCDYAKEQZPOSGXNRMWFL` | — | 7 Feb 1941 | German Railway (Rocket) |

## 3. Reflector Configurations (Umkehrwalze)

Reflectors are fixed and reciprocal. They do not have notches or stepping mechanisms.

| ID | Wiring (A -> Z) | Date Introduced | Model Name & Number |
| :--- | :--- | :--- | :--- |
| **Reflector A** | `EJMZALYXVBWFCRQUONTSPIKHGD` | — | UKW A |
| **Reflector B** | `YRUHQSLDPXNGOKMIEBFZCWVJAT` | — | UKW B (Wide) |
| **Reflector C** | `FVPJIAOYEDRZXWGCTKUQSBNMHL` | — | UKW C (Wide) |
| **Reflector B Thin** | `ENKQAUYWJICOPBLMDXZVFTHRGS` | 1940 | M4 R1 (Thin) |
| **Reflector C Thin** | `RDOBJNTKVEHMLFCWZAXGYIPSUQ` | 1940 | M4 R1 (Thin) |
| **Beta** | `LEYJVCNIXWPBQMDRTAKZGFUHOS` | Spring 1941 | M4 R2 (Greek) |
| **Gamma** | `FSOKANUERHMBTIYCWLQPZXVGJD` | Spring 1942 | M4 R2 (Greek) |
| **ETW** | `ABCDEFGHIJKLMNOPQRSTUVWXYZ` | — | Enigma I Entry Stator |
| **ETW-K** | `QWERTZUIOASDFGHJKPYXCVBNML` | Feb 1939 | Swiss K / Railway ETW |

## 4. Understanding Offsets

The total offset of a rotor at any given moment is a combination of its **Initial Position** and its **Ring Setting**.

1.  **Ring Setting (Ringstellung):** A fixed internal offset that rotates the wiring relative to the notch and the alphabet ring. 
    *   *Effect:* Changing the Ring Setting shifts the internal wiring. If Rotor I in position A maps A->E, changing the Ring Setting to B (02) might map A->K.
2.  **Initial Position (Grundstellung):** The physical rotation of the rotor as seen in the window.
    *   *Effect:* Every step increments this position (0-25), shifting the entry point of the electrical signal.

**Total Effective Offset = (Current Position - Ring Setting) mod 26.**

## 5. Stepping Logic Verification

### Turnover Mechanism
A rotor triggers the next rotor to its left to step when it moves **OFF** its notch position. This happens *during* the rotation phase of the keypress.

| Rotor | Notch | Turnover Effect |
| :--- | :--- | :--- |
| **I** | **Q** | If rotor steps from **Q to R**, the next rotor is advanced. |
| **II** | **E** | If rotor steps from **E to F**, the next rotor is advanced. |
| **III** | **V** | If rotor steps from **V to W**, the next rotor is advanced. |
| **IV** | **J** | If rotor steps from **J to K**, the next rotor is advanced. |
| **V** | **Z** | If rotor steps from **Z to A**, the next rotor is advanced. |
| **VI, VII, VIII** | **Z, M** | If rotor steps from **Z to A** OR **M to N**, the next rotor is advanced. |

### Double Stepping
The Middle rotor will step twice if it is at its own notch position when the Right rotor steps. This is a mechanical quirk of the pawl-and-ratchet system where the pawl for the middle rotor engages the notch of the middle rotor itself.
