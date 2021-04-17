import client from './api';

const signIn = async (payload, onSuccess, onError, onEnd, onStart) => {
  try {
    onStart();
    const { email, password } = payload;
    const result = await client.post('/login', { user: { email, password } });

    onSuccess(result.data);
  } catch (error) {
    onError(error.response.data);
  } finally {
    onEnd();
  }
};

export default signIn;
