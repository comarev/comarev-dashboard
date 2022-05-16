const REAL_TO_CENTS_FACTOR = 100;

export const centsToReal = (cents) => {
  if (typeof cents !== 'number' || !Number.isInteger(cents)) {
    return 'Not valid amount';
  }

  return (cents / REAL_TO_CENTS_FACTOR).toLocaleString('pt-br', {
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

  const cents = parseFloat(parsedReal) * REAL_TO_CENTS_FACTOR;

  return cents;
};
