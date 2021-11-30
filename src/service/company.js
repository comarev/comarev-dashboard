import service from '../service/api';

const getCompanies = async ({ onStart, onFailure, onCompleted, onSuccess }) => {
  try {
    onStart();
    const { data } = await service.get('/companies');

    onSuccess(data);
  } catch (error) {
    onFailure();
  } finally {
    onCompleted();
  }
};

const parseCompany = (payload) => {
  const { name, email, cnpj, phone, address, code, discount, active } = payload;

  return {
    name,
    email,
    phone,
    address,
    cnpj,
    code: parseInt(code),
    discount: parseFloat(discount),
    active: active ? JSON.parse(active) : false,
  };
};

const registerCompany = async ({
  payload,
  onStart,
  onSuccess,
  onError,
  onCompleted,
}) => {
  try {
    onStart();
    await service.post('/companies', { company: parseCompany(payload) });

    onSuccess();
  } catch (error) {
    onError(error.response.data);
  } finally {
    onCompleted();
  }
};

export { getCompanies, registerCompany };
