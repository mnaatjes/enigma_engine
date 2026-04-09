# Proposed Design: Plugboard Model

The `Plugboard` is the first and last component a signal passes through in the Enigma machine. It manages a collection of `PlugPair` objects and ensures that no single letter is connected to more than one plug.

## 1. Responsibilities

- **Mutual Exclusivity:** Ensuring a letter (e.g., 'A') is not plugged into multiple partners (e.g., 'A-M' and 'A-Z' cannot both exist).
- **Signal Transformation:** Swapping a character if a plug exists, or returning the original character if it does not.
- **Parsing:** Converting user-friendly strings (like `"AM FI NV"`) into internal `PlugPair` logic.

## 2. Proposed Class Structure

```typescript
import { EnigmaChar } from "./EnigmaChar.js";
import { PlugPair } from "./PlugPair.js";

/**
 * The Plugboard (Steckerbrett) handles the initial and final character swaps.
 * It is a collection of mutually exclusive PlugPairs.
 */
export class Plugboard {
  private readonly _pairs: PlugPair[];

  /**
   * Private constructor to ensure validation happens via factory methods.
   */
  private constructor(pairs: PlugPair[]) {
    this._pairs = pairs;
    this.validateExclusivity();
  }

  /**
   * Factory: Create a Plugboard from a space-separated string of pairs.
   * Example: "AM FI NV"
   */
  public static fromString(pairsString: string): Plugboard {
    const pairs: PlugPair[] = [];
    const segments = pairsString.toUpperCase().split(/\s+/).filter(s => s.length > 0);

    for (const segment of segments) {
      if (segment.length !== 2) {
        throw new Error(`Invalid Plugboard pair segment: "${segment}". Must be exactly 2 letters.`);
      }
      const first = EnigmaChar.fromLetter(segment[0]!);
      const second = EnigmaChar.fromLetter(segment[1]!);
      pairs.push(new PlugPair(first, second));
    }

    return new Plugboard(pairs);
  }

  /**
   * Factory: Create an empty Plugboard (no connections).
   */
  public static empty(): Plugboard {
    return new Plugboard([]);
  }

  /**
   * Processes a character through the plugboard.
   * If the character is plugged, returns the partner. Otherwise returns the same char.
   */
  public process(char: EnigmaChar): EnigmaChar {
    for (const pair of this._pairs) {
      const result = pair.swap(char);
      if (result) return result;
    }
    return char;
  }

  /**
   * Internal validation: Ensures no letter appears in more than one pair.
   */
  private validateExclusivity(): void {
    const seen = new Set<string>();
    for (const pair of this._pairs) {
      for (const letter of pair.letters) {
        if (seen.has(letter)) {
          throw new Error(`Duplicate letter found in Plugboard configuration: ${letter}`);
        }
        seen.add(letter);
      }
    }
  }

  /**
   * Returns a list of all currently plugged pairs as strings.
   */
  public get pairs(): string[] {
    return this._pairs.map(p => p.letters.join(''));
  }
}
```

## 3. Key Design Decisions

- **Collection over Map:** While a `Map` is faster for lookups, the historical Enigma was limited to 13 pairs. Iterating over an array of 13 objects is negligible in performance and allows the `PlugPair` object to maintain its own logic.
- **Validation on Construction:** The `validateExclusivity()` method ensures that an invalid `Plugboard` state can never exist in the domain.
- **Immutability:** Like the `EnigmaChar`, the `Plugboard` is intended to be initialized once per session. If a user "re-plugs" the machine, a new `Plugboard` instance is created.
