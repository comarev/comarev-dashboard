import { renderReactQueryHook } from 'hooks/__test__/hook-test-utils.js';
import useDiscountRequest from 'hooks/use-discount-request';
import axios from 'service/api';
import MockAdapter from 'axios-mock-adapter';
import mockedDiscountRequest from 'test/fixtures/discount-request';

const mock = new MockAdapter(axios);

const genericCompanyId = 1;

const renderUseDiscountRequestHook = () =>
  renderReactQueryHook(() => useDiscountRequest(genericCompanyId));

describe('useDiscountRequest hook', () => {
  beforeEach(() => {
    mock
      .onGet(`/companies/${genericCompanyId}/discount_requests`)
      .reply(200, mockedDiscountRequest);
  });

  it('isLoading during the fetch', async () => {
    const hook = renderUseDiscountRequestHook();
    expect(hook.result.current.isLoading).toBe(true);
    await hook.waitForNextUpdate();
    expect(hook.result.current.isLoading).toBe(false);
  });

  it('return discount request list', async () => {
    const hook = renderUseDiscountRequestHook();
    await hook.waitForNextUpdate();
    expect(hook.result.current.invoicesList).toStrictEqual(
      mockedDiscountRequest
    );
  });
});
