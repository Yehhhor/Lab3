export class Validation {
  public static validateRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  public static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public static validateYear(year: string): boolean {
    const currentYear = new Date().getFullYear();
    const yearRegex = /^[0-9]{4}$/;
    const yearNumber = parseInt(year, 10);
    return yearRegex.test(year) && yearNumber > 0 && yearNumber <= currentYear;
  }

  public static validateForm(form: HTMLFormElement): {
    isValid: boolean;
    errors: Map<string, string>;
  } {
    const errors = new Map<string, string>();
    const inputs = form.querySelectorAll('input');

    inputs.forEach((input: HTMLInputElement) => {
      if (!this.validateRequired(input.value)) {
        errors.set(input.name, 'Це поле є обовязковим');
      } else if (input.name === 'email' && !this.validateEmail(input.value)) {
        errors.set(input.name, 'Некоректний формат email');
      } else if (input.name === 'year' && !this.validateYear(input.value)) {
        errors.set(input.name, 'Некоректний рік видання');
      }
    });

    return {
      isValid: errors.size === 0,
      errors: errors,
    };
  }
}
