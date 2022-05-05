import { onlyNumbers, parseCellphone } from 'utils/parsers/general';

describe('General parsers', () => {
  describe('onlyNumbers', () => {
    it('should return a string with only numbers', () => {
      expect(onlyNumbers('asd+11(123)11.2341234')).toBe('11123112341234');
    });
  });

  describe('parseCellphone', () => {
    it('should return a string with only numbers and a plus sign', () => {
      expect(parseCellphone('+55(011)1234-1234')).toBe('+5501112341234');
    });
  });
});
