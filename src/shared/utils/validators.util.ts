export abstract class ValidatorsUtil {
  static isEmail(email: string): boolean {
    const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
