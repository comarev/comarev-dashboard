export const createCompany = (active = true, discount = 10) => {
  const companyData = {
    id: 1,
    active,
    address: 'Rua do abacaxi, 648',
    avatar: { url: null },
    cnpj: "97632841935950",
    code: "1371076f4aa194d51287",
    created_at: "2022-03-03T14:14:47.962Z",
    discount,
    name: "Lucy Brooks LTDA",
    phone: '99 99988281',
    updated_at: "2022-03-03T14:14:47.962Z",
  };

  return companyData;
};