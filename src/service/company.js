import api from './api';

const fetchCompany = async ({
  id,
  onStart,
  onSuccess,
  onFailure,
  onCompleted,
}) => {
  try {
    onStart();
    const { data } = await api.get(`/companies/${id}`);

    onSuccess(data);
  } catch (error) {
    onFailure();
  } finally {
    onCompleted();
  }
};

export { fetchCompany };
