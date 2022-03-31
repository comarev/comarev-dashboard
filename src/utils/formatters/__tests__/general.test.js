import { formatCellphone, formatCpfCnpj } from '../general';

describe('Formatters', () => {
  describe('formatCellphone', () => {
    it('should format cellphone', () => {
      expect(formatCellphone('+5501612341234')).toBe('(016) 1234-1234');
      expect(formatCellphone('+55016912341234')).toBe('(016) 91234-1234');
    });
  });

  describe('formatCpfCnpj', () => {
    it('should format cpf', () => {
      expect(formatCpfCnpj('12345678901')).toBe('123.456.789-01');
    });

    it('should format cnpj', () => {
      expect(formatCpfCnpj('12345678901234')).toBe('12.345.678/9012-34');
    });
  });
});
