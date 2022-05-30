import useCompaniesSelectionMenuItem from 'hooks/use-companies-selection-menu-item';
import { renderReactQueryHook } from 'hooks/__test__/hook-test-utils.js';
import mockedCompanies from 'test/fixtures/companies';
import { act } from 'react-test-renderer';
const renderUseCompaniesSelectionMenuItem = () =>
  renderReactQueryHook(() => useCompaniesSelectionMenuItem(mockedCompanies));

describe('useCompaniesSelectionMenuItem hook', () => {
  it('selectedCompanyId should be the fist elements id', async () => {
    const { result } = renderUseCompaniesSelectionMenuItem();

    expect(result.current.selectedCompanyId).toBe(mockedCompanies[0].id);
  });

  it('updates selectedCompanyId by handleChange', () => {
    const companyToSelect = mockedCompanies[2];
    const { result } = renderUseCompaniesSelectionMenuItem();

    act(() => {
      result.current.handleChangeCompany({
        target: { value: companyToSelect.id },
      });
    });

    expect(result.current.selectedCompanyId).toBe(companyToSelect.id);
  });
});
