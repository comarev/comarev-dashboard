export const createUser = (role = 'admin') => {
  const userData = {
    id: 1,
    full_name: 'John',
    email: 'john-doe@email.com',
    cpf: '12345678912',
    address: 'Rua do limao, 324',
    cellphone: '16999999999',
    companies: [],
    picture_url: 's3://foto-feia',
    active: true,
    logged: true,
    admin: false,
    manager: false,
    customer: false,
    created_at: '2021-05-10 17:23:50.0',
    updated_at: '2021-05-10 17:23:50.0',
    userToken: undefined
  };

  return { ...userData, [role]: true }
};
