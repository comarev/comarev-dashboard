export const onlyNumbers = (value) => value.replace(/\D/g, '');

export const parseCurrency = (value) =>
  value.toString().replace('.', '').replace(',', '.').replace('R$', '');
