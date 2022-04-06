export const onlyNumbers = (value) => value.replace(/\D/g, '');

export const parseCurrency = (value) => {
  if (typeof value === 'number') return value;

  const parsedValue = value
    .toString()
    .replace('.', '')
    .replace(',', '.')
    .replace('R$', '')
    .trim();

  return Number(parsedValue)
};

export const parseCellphone = (value) => value.replace(/(?!\+)\D/g, '');
