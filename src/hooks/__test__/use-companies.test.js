import useCompanies from 'hooks/use-companies';
import { renderReactQueryHook } from 'hooks/__test__/hook-test-utils.js';
import MockAdapter from 'axios-mock-adapter';
import axios from 'service/api';
import mockedCompanies from 'test/fixtures/companies';

const mock = new MockAdapter(axios);

const renderUseCompaniesHook = () => renderReactQueryHook(useCompanies);

describe('useCompanies hook', () => {
  beforeEach(() => {
    mock.onGet('/companies').reply(200, mockedCompanies);
  });

  it('isLoading during the fetch', async () => {
    const hook = renderUseCompaniesHook();
    expect(hook.result.current.isLoading).toBe(true);
    await hook.waitForNextUpdate();
    expect(hook.result.current.isLoading).toBe(false);
  });

  it('return companies list', async () => {
    const hook = renderUseCompaniesHook();
    await hook.waitForNextUpdate();
    expect(hook.result.current.companies).toStrictEqual(mockedCompanies);
  });
});
