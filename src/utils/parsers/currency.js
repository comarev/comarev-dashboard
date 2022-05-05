export const centsToReal = (cents) => {
  if (typeof cents !== 'number' || !Number.isInteger(cents)) {
    throw new TypeError('cents must be an Integer number');
  }

  return (cents / 100).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const realToCents = (real) => {
  if (typeof real !== 'string') {
    throw new TypeError('real must be an string');
  }

  const parsedReal = real
    .toString()
    .replace('.', '')
    .replace(',', '.')
    .replace('R$', '')
    .trim();

  const cents = parseFloat(parsedReal) * 100;

  return cents;
};
