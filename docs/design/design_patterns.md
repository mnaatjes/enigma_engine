# Object-Oriented Design Patterns in Enigma Machine

This document outlines the core Object-Oriented Programming (OOP) design patterns selected for implementing the Enigma machine logic in TypeScript.

## 1. Component-Based Design (Encapsulation)

**Concept:** Breaking down the complex machine into its constituent physical parts, where each part is a class responsible for its own state and specific behavior.

**Application:**
*   **`Rotor` Class:** Encapsulates the internal wiring mapping (e.g., A -> J, B -> G), the current rotational position, the notch position (which triggers the next rotor to step), and the ring setting (`Ringstellung`). It exposes methods like `forwardProcess(char)`, `backwardProcess(char)`, and `step()`.
*   **`Plugboard` Class:** Encapsulates a simple mapping of character pairs. It exposes a single method like `swap(char)` which either returns the paired character or the original character if unmapped.
*   **`Reflector` Class:** Similar to a rotor but with fixed, reciprocal wiring (e.g., A -> Y implies Y -> A) and no stepping capability.

**Benefit:** Makes the code highly modular and perfectly mirrors the physical reality of the machine.

## 2. Strategy Pattern

**Concept:** Defining a family of algorithms, encapsulating each one, and making them interchangeable.

**Application:** 
Historical Enigma machines had different sets of rotors (e.g., Rotor I, II, III, IV, V from the M3 machine) and reflectors (Reflector B, Reflector C). 
Instead of hardcoding complex `switch` statements, we define standard wirings as "strategies" (or configuration objects) that are passed into a generic `Rotor` or `Reflector` instance upon creation.

*   `const rotorIConfig = { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" };`
*   `const rotor1 = new Rotor(rotorIConfig);`

**Benefit:** Adding new historical or custom rotors doesn't require modifying the `Rotor` class itself; you simply provide a new configuration strategy.

## 3. Builder Pattern (or Factory Method)

**Concept:** Separating the construction of a complex object from its representation so that the same construction process can create different representations.

**Application:**
Assembling an `EnigmaMachine` requires placing specific rotors in specific slots (Left, Middle, Right), setting their initial alphabet positions (e.g., 'A', 'B', 'C'), setting their internal ring settings, and configuring the plugboard connections.

A `MachineBuilder` class can simplify this:
```typescript
const enigma = new EnigmaBuilder()
    .withReflector('B')
    .withRotorSequence(['I', 'II', 'III'])
    .withRingSettings(['A', 'A', 'B'])
    .withPositions(['X', 'Y', 'Z'])
    .withPlugboard('AM FI NV')
    .build();
```

**Benefit:** Provides a fluent, readable API for creating complex valid machine states, avoiding constructors with massive lists of arguments.

## 4. Facade Pattern

**Concept:** Providing a unified, higher-level interface to a set of interfaces in a subsystem that makes the subsystem easier to use.

**Application:**
The `EnigmaMachine` class itself acts as a Facade. A client calling `enigma.encryptChar('A')` doesn't need to know the complex internal choreography required:
1.  Step the rightmost rotor.
2.  Pass the character through the plugboard.
3.  Pass it forward through the right, middle, and left rotors.
4.  Pass it through the reflector.
5.  Pass it backward through the left, middle, and right rotors.
6.  Pass it through the plugboard again.

The `EnigmaMachine` facade hides this sequence behind a single, simple method.

**Benefit:** Greatly simplifies the interface for consumers of the library (like a CLI or API) who just want to input text and get encrypted text out.