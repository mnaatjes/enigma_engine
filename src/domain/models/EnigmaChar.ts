/**
 * EnigmaChar is a Domain Value Object representing a single character in the Enigma system.
 * It encapsulates the relationship between a letter (A-Z) and its numeric index (0-25).
 * 
 * This object is immutable. Any transformation (like shifting) returns a new instance.
 */
export class EnigmaChar {
  private readonly _index: number;

  private constructor(index: number) {
    // Ensure the index is a positive integer between 0 and 25
    // ((n % 26) + 26) % 26 handles negative wrapping correctly
    this._index = ((Math.floor(index) % 26) + 26) % 26;
  }

  /**
   * Factory method to create an EnigmaChar from a single letter (A-Z).
   * @param letter A single character string.
   * @throws Error if the input is not a single A-Z letter.
   */
  public static fromLetter(letter: string): EnigmaChar {
    const upper = letter.toUpperCase();
    if (!/^[A-Z]$/.test(upper)) {
      throw new Error(`Invalid Enigma character: "${letter}". Must be a single letter A-Z.`);
    }
    return new EnigmaChar(upper.charCodeAt(0) - 65);
  }

  /**
   * Factory method to create an EnigmaChar from a numeric index (0-25).
   * Automatically handles wrapping (e.g., -1 becomes 25/Z).
   * @param index Any integer.
   */
  public static fromIndex(index: number): EnigmaChar {
    return new EnigmaChar(index);
  }

  /**
   * Returns the 0-indexed position of the character (0-25).
   */
  public get index(): number {
    return this._index;
  }

  /**
   * Returns the uppercase letter representation of the character.
   */
  public get letter(): string {
    return String.fromCharCode(65 + this._index);
  }

  /**
   * Returns a new EnigmaChar shifted by the given offset.
   * @param offset The number of positions to shift (positive or negative).
   */
  public shift(offset: number): EnigmaChar {
    return new EnigmaChar(this._index + offset);
  }

  /**
   * Calculates the distance between this character and another.
   * Useful for finding relative offsets between rotors.
   */
  public distanceTo(other: EnigmaChar): number {
    return ((other.index - this._index) % 26 + 26) % 26;
  }

  public equals(other: EnigmaChar): boolean {
    return this._index === other.index;
  }

  public toString(): string {
    return this.letter;
  }

  public toJSON(): string {
    return this.letter;
  }
}
