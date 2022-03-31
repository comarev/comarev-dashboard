import service from '../service/api';
import { buildFormData } from '../utils/parsers/jsonToFormData';
import { onlyNumbers } from '../utils/parsers/general';

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

export const newGetCompanies = async () => await service.get('/companies');

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
    avatar,
  } = payload;

  return {
    name,
    email,
    phone,
    address,
    cnpj: onlyNumbers(cnpj),
    discount: parseFloat(discount),
    active: active ? JSON.parse(active) : false,
    manager_ids: managers?.map((manager) => manager.id) || [],
    regular_ids: regulars?.map((regular) => regular.id) || [],
    avatar,
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
    const formData = new FormData();
    buildFormData(formData, parseCompany(payload), 'company');
    await service.post('/companies', formData, {
      'Content-Type': 'multipart/form-data',
    });

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
  const formData = new FormData();
  buildFormData(formData, parseCompany(company), 'company');

  return await service.patch(`/companies/${company.id}`, formData, {
    'Content-Type': 'multipart/form-data',
  });
};

const getShowcase = async () => await service.get('/showcase');

export {
  getCompanies,
  registerCompany,
  getCompany,
  updateCompany,
  getShowcase,
};
