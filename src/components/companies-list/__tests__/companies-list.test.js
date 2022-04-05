import React from 'react';
import { render, screen } from '@testing-library/react';
import CompaniesList from 'components/companies-list/companies-list';
import mockedCompanies from 'test/fixtures/companies';

describe('Companies List', () => {
  it('renders 3 lines', () => {
    render(<CompaniesList data={mockedCompanies} />);

    mockedCompanies.forEach((company) => {
      expect(screen.getByText(company.name)).toBeInTheDocument();
    });
  });
});
