import { expect } from 'chai';
import { Validation } from '../src/validation'; // Коригуйте шлях до файлу відповідно до структури проєкту

describe('Validation', () => {
  describe('validateRequired', () => {
    it('should return true for non-empty string', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(Validation.validateRequired('test')).to.be.true;
    });

    it('should return false for empty string', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(Validation.validateRequired('')).to.be.false;
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(Validation.validateEmail('test@example.com')).to.be.true;
    });

    it('should return false for invalid email', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(Validation.validateEmail('invalid-email')).to.be.false;
    });
  });

  describe('validateYear', () => {
    it('should return true for a valid year within the range', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(Validation.validateYear('2023')).to.be.true;
    });

    it('should return false for a year outside the range', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(Validation.validateYear('2025')).to.be.false;
    });

    it('should return false for an invalid year format', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(Validation.validateYear('abcd')).to.be.false;
    });
  });

  describe('validateForm', () => {
    it('should validate form inputs correctly', () => {
      const form = document.createElement('form');
      form.innerHTML = `
        <input name="email" value="test@example.com">
        <input name="year" value="2023">
        <input name="requiredField" value="some value">
      `;

      const result = Validation.validateForm(form as HTMLFormElement);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(result.isValid).to.be.true;
      expect(result.errors.size).to.equal(0);
    });

    it('should return errors for invalid inputs', () => {
      const form = document.createElement('form');
      form.innerHTML = `
        <input name="email" value="invalid-email">
        <input name="year" value="2025">
        <input name="requiredField" value="">
      `;

      const result = Validation.validateForm(form as HTMLFormElement);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(result.isValid).to.be.false;
      expect(result.errors.get('email')).to.equal('Некоректний формат email');
      expect(result.errors.get('year')).to.equal('Некоректний рік видання');
      expect(result.errors.get('requiredField')).to.equal('Це поле є обовязковим');
    });
  });
});
