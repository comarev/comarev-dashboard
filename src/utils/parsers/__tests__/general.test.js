import { onlyNumbers, parseCurrency, parseCellphone } from 'utils/parsers/general';

describe('Parsers', () => {
  describe('onlyNumbers', () => {
    it('should return a string with only numbers', () => {
      expect(onlyNumbers('asd+11(123)11.2341234')).toBe('11123112341234');
    });
  });

  describe('parseCurrency', () => {
    it('should return only numbers', () => {
      expect(parseCurrency('R$ 1.000,23')).toBe(1000.23);
      expect(parseCurrency(1000.23)).toBe(1000.23);
    });
  });

  describe('parseCellphone', () => {
    it('should return a string with only numbers and a plus sign', () => {
      expect(parseCellphone('+55(011)1234-1234')).toBe('+5501112341234');
    });
  });
});
