export class StringUtils {
  static isNullOrWhitespace(input: string | null): boolean {
      return input == null || !input.trim();
  }
}
