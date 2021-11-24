import service from '../service/api';

const getCompanies = async ({ onStart, onFailure, onCompleted, onSuccess }) => {
  try {
    onStart();
    const { data } = await service.get('/companies');
    onSuccess(data.data);
  } catch (error) {
    onFailure();
  } finally {
    onCompleted();
  }
};

export { getCompanies };
