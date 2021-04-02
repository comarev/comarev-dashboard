import signIn from '../auth';
import MockAdapter from 'axios-mock-adapter';
import axios from '../api';

const mock = new MockAdapter(axios);

const setup = () => {
  const onSuccess = jest.fn();
  const onError = jest.fn();
  const onStart = jest.fn();
  const onEnd = jest.fn();
  const payload = { email: 'john@email.com', password: '123456' };

  return { payload, onSuccess, onError, onStart, onEnd };
};

describe('AuthService', () => {
  describe('#signIn', () => {
    describe('when successfully', () => {
      const userMock = { user: { full_name: 'John', email: 'john@email.com' } };

      beforeEach(() => {
        mock.onPost('/login').reply(200, userMock);
      });

      it('calls onSuccess', async () => {
        const { onEnd, onError, payload, onStart, onSuccess } = setup();
        await signIn(payload, onSuccess, onError, onEnd, onStart);

        expect(onSuccess).toHaveBeenCalledWith(userMock);
      });
    });

    describe('when failure', () => {
      const errorMessage = 'email or password invalid';

      beforeEach(() => {
        mock.onPost('/login').reply(400, errorMessage);
      });

      it('calls onError', async () => {
        const { onEnd, onError, payload, onStart, onSuccess } = setup();
        await signIn(payload, onSuccess, onError, onEnd, onStart);

        expect(onError).toHaveBeenCalledWith(errorMessage);
      });
    });

    it('calls onStart and onEnd', async () => {
      const { onEnd, onError, payload, onStart, onSuccess } = setup();
      await signIn(payload, onSuccess, onError, onEnd, onStart);

      expect(onStart).toHaveBeenCalled();
      expect(onEnd).toHaveBeenCalled();
    });
  });
});
