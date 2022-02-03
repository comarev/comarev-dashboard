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
  const {
    name,
    email,
    cnpj,
    phone,
    address,
    discount,
    active,
    managers,
    regulars,
  } = payload;

  return {
    name,
    email,
    phone,
    address,
    cnpj,
    discount: parseFloat(discount),
    active: active ? JSON.parse(active) : false,
    manager_ids: managers?.map((manager) => manager.id) || [],
    regular_ids: regulars?.map((regular) => regular.id) || [],
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

const getCompany = async (id) => {
  return await service.get(`/companies/${id}`);
};

const updateCompany = async (company) => {
  return await service.patch(`/companies/${company.id}`, {
    company: parseCompany(company),
  });
};

export { getCompanies, registerCompany, getCompany, updateCompany };
