import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useCompanies from 'hooks/use-companies';
import { updateCompany } from 'store/modules/current-company/actions';
import { fetchCurrentCompany } from 'store/modules/current-company/reducer';

export const CompanyPicker = () => {
  const { companies, isLoading } = useCompanies();
  const currentCompany = useSelector((state) => state.currentCompany);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const company = fetchCurrentCompany(companies, event);
    dispatch(updateCompany({ id: company.id}));
  };

  const render = () => {
    if(isLoading) return <Box>Carregando empresas</Box>

    return (
      <Box sx={{ minWidth: 100 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Company</InputLabel>
          <Select
            value={currentCompany.id || currentUser.companies[0].id}
            onChange={(e) => handleChange(e)}
          >
            {currentUser.companies.map((c) => {
              return (
                <MenuItem key={c.company.id} value={c.company.id}>
                  {c.company.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
  return render();
};
