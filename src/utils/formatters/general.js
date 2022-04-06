export const formatCpfCnpj = (value) => {
  const cnpjCpf = value.replace(/\D/g, '');

  if (cnpjCpf.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  return cnpjCpf.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5'
  );
};

export const formatCellphone = (value) => {
  return value.replace(/^(\+\d{2})\D*(\d{3})\D*(\d{5}|\d{4})\D*(\d{4})$/g, '($2) $3-$4');
};
