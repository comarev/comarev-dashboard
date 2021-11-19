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

const registerCompany = async ({
  payload,
  onStart,
  onSuccess,
  onError,
  onCompleted,
}) => {
  try {
    onStart();
    await service.post('/companies', { company: payload });

    onSuccess();
  } catch (error) {
    onError(error.response.data);
  } finally {
    onCompleted();
  }
};

export { getCompanies, registerCompany };
