import {
  formatCellphone,
  formatCpfCnpj,
  getHourFormatted,
  getDateFormatted,
} from 'utils/formatters/general';

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

  const dateTest = '2022-05-23T18:35:43.680Z';
  describe('getHourFormatted', () => {
    it('should format date string into the dd/MM/yy date format', () => {
      expect(getDateFormatted(dateTest)).toBe('23/05/22');
    });

    it('should format date string to 24-hour-clock format', () => {
      expect(getHourFormatted(dateTest)).toBe('15:35');
    });
  });
});
