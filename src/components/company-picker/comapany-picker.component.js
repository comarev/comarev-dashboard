import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useCompanies from 'hooks/use-companies';
import { updateCompany } from 'store/modules/current-company/actions';

export const CompanyPicker = () => {
  const { companies, isLoading } = useCompanies();
  const currentCompany = useSelector((state) => state.currentCompany);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const company = companies.find((c) => c.id === event.target.value);
    dispatch(updateCompany({ id: company.id, name: company.name }));
  };

  if(isLoading) return <Box>Carregando empresas</Box>

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Company</InputLabel>
        <Select
          value={currentCompany.id || companies[0].id}
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
};
