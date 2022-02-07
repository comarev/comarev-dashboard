export const onlyNumbers = (value) => value.replace(/\D/g, '');

export const parseCurrency = (value) =>
  value.replace('.', '').replace(',', '.').replace('R$', '');
