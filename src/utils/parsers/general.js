export const onlyNumbers = (value) => value.replace(/\D/g, '');

export const parseCurrency = (value) => {
  if (typeof value === 'number') return value;

  return value
    .toString()
    .replace('.', '')
    .replace(',', '.')
    .replace('R$', '')
    .trim();
};
