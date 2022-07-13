import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { updateCompany } from 'store/modules/current-company/actions';
import { fetchCurrentCompany } from 'store/modules/current-company/reducer';

export const CompanyPicker = () => {
  const currentCompany = useSelector((state) => state.currentCompany);
  const currentUser = useSelector((state) => state.user);
  const currentUserCompanies = currentUser.companies.map(c => c.company);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const company = fetchCurrentCompany(currentUserCompanies, event);
    dispatch(updateCompany({ id: company.id }));
  };

  const render = () => {
    if (currentUserCompanies.length === 0) return <Box color='black'>Carregando empresas</Box>;

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='edit-company-selector'>Company</InputLabel>
          <Select value={currentCompany.id} onChange={(e) => handleChange(e)}>
            {currentUserCompanies.map((company) => {
              return (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  };
  return render();
};
