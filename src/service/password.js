import client from './api';

export const passwordRecovery = async (
  payload,
  onSuccess,
  onError,
  onEnd,
  onStart
) => {
  try {
    onStart();
    const { email } = payload;
    const result = await client.post('/users/password', { user: { email } });

    onSuccess({ ...result.data });
  } catch (error) {
    onError(error.response.data.message);
  } finally {
    onEnd();
  }
};

export const newPassword = async (
  payload,
  onSuccess,
  onError,
  onEnd,
  onStart,
  token
) => {
  try {
    onStart();
    const { password, confirmPassword } = payload;
    // It seems like there isn't still a endpoint to reset a user password
    const result = await client.post('/users/set-password', {
      user: { password, confirmPassword },
    });

    onSuccess({ ...result.data });
  } catch (error) {
    onError(error.response.data);
  } finally {
    onEnd();
  }
};
