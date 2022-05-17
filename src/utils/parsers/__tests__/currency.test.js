import { centsToReal, realToCents } from 'utils/parsers/currency';

describe('Currency parsers', () => {
  describe('centsToReal', () => {
    it('should only accept an Integer numbers', () => {
      expect(centsToReal('123')).toBe('Not valid amount');
      expect(centsToReal(123.1)).toBe('Not valid amount');
    });

    it('should return a valid currency value', () => {
      expect(centsToReal(123)).toBe('R$ 1,23');
      expect(centsToReal(1)).toBe('R$ 0,01');
    });
  });

  describe('realToCents', () => {
    it('should return only a Integer number', () => {
      expect(realToCents('R$ 1.000,23')).toBe(100023);
      expect(realToCents(1000.23)).toBe(100023);
    });
  });
});
