# Historical Presets and Configuration Data

This document serves as the official reference for historical Enigma machine components, including their internal wiring and stepping mechanisms.

## 1. The Standard Alphabet

All encryption operations are based on the standard 26-letter Latin alphabet.

| Reference | Sequence |
| :--- | :--- |
| **ALPHABET** | `A B C D E F G H I J K L M N O P Q R S T U V W X Y Z` |

## 2. Rotor Configurations (Walzen)

Rotors consist of a static internal wiring and a specific "notch" position that triggers the stepping of the rotor to its left.

| ID | Wiring (Alphabetical Mapping) | Notch(es) | Notes |
| :--- | :--- | :--- | :--- |
| **I** | `EKMFLGDQVZNTOWYHXUSPAIBRCJ` | **Q** | Enigma I (Wehrmacht/Luftwaffe) |
| **II** | `AJDKSIRUXBLHWTMCQGZNPYFVOE` | **E** | Enigma I |
| **III** | `BDFHJLCPRTXVZNYEIWGAKMUSQO` | **V** | Enigma I |
| **IV** | `ESOVPZJAYQUIRHXLNFTGKDCMWB` | **J** | M3 Army |
| **V** | `VZBRGITYUPSDNHLXAWMJQOFECK` | **Z** | M3 Army |
| **VI** | `JPGVOUMFYQBENHZRDKASXLICTW` | **ZM** | Naval (M3/M4) - Double Notch |
| **VII** | `NZJHGRCXMYSWBOUFAIVLPEKQDT` | **ZM** | Naval (M3/M4) - Double Notch |
| **VIII** | `FKQHTLXOCBJSPDZRAMEWNIUYGV` | **ZM** | Naval (M3/M4) - Double Notch |

*Note: Rotors VI, VII, and VIII have two notches (at Z and M), meaning they trigger a step twice as often.*

## 3. Reflector Configurations (Umkehrwalze)

Reflectors are fixed and reciprocal. Unlike rotors, they do not have notches or stepping mechanisms.

| ID | Wiring (Alphabetical Mapping) | Description |
| :--- | :--- | :--- |
| **UKB_A** | `EJMZALYXVBWFCRQUONTSPIKHGD` | Original 1930 Reflector |
| **UKB_B** | `YRUHQSLDPXNGOKMIEBFZCWVJAT` | Standard Reflector B |
| **UKB_C** | `FVPJIAOYEDRZXWGCTKUQSBNMHL` | Standard Reflector C |
| **beta** | `LEYJVCNIXWPBQMDRTAKZGFUHOS` | M4 Greek Rotor (Fixed) |
| **gamma** | `FSOKANUERHMBTIYCWLQPZXVGJD` | M4 Greek Rotor (Fixed) |
| **thinB** | `ENKQAUYWJICOPBLMDXZVFTHRGS` | M4 Thin Reflector B |
| **thinC** | `RDOBJNTKVEHMLFCWZAXGYIPSUQ` | M4 Thin Reflector C |
| **ETW** | `ABCDEFGHIJKLMNOPQRSTUVWXYZ` | Entry Stator (Standard) |

## 4. Operational Limits & Constraints

*   **Rotor Count:** Typically 3 (Enigma I/M3) or 4 (Enigma M4).
*   **Plugboard Pairs:** Historically limited to a maximum of 13 pairs (usually 10 in standard military use).
*   **Characters:** Only uppercase A-Z are supported. All other characters (spaces, numbers, punctuation) are traditionally excluded or replaced.
