import client from './api';

export const signIn = async ({
  email,
  password,
  onSubmit,
  onError,
  onEnd,
  onStart,
}) => {
  try {
    if (onStart) onStart();

    const result = await client.post('/login', { user: { email, password } });

    // Redirect to dashboard
  } catch (error) {
    if (onError) onError(error.response.data);
  } finally {
    if (onEnd) onEnd();
  }
};
