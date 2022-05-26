import useCompaniesSelectionMenuItem from 'hooks/use-companies-selection-menu-item';
import { renderReactQueryHook } from 'hooks/__test__/hook-test-utils.js';
import mockedCompanies from 'test/fixtures/companies';

const renderUseCompaniesSelectionMenuItem = () =>
  renderReactQueryHook(useCompaniesSelectionMenuItem, mockedCompanies);

describe('useCompaniesSelectionMenuItem hook', () => {
  it('selectedCompany should be the fist element', async () => {
    const hook = renderUseCompaniesSelectionMenuItem();
    expect(hook.result.current.selectedCompanyId).toBe(undefined);
    await hook.waitForNextUpdate();
    expect(hook.result.current.selectedCompanyId).toBe(mockedCompanies[0]);
  });

  it('selectedCompany should be the third element', async () => {
    const hook = renderUseCompaniesSelectionMenuItem();
    expect(hook.result.current.selectedCompanyId).toBe(undefined);
    hook.result.current.handleChangeCompany({
      target: { value: mockedCompanies[0].id },
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.selectedCompanyId).toBe(mockedCompanies[0]);
  });
});
