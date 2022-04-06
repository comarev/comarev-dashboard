import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useLocation, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCompanies } from 'service/company';
import { Box, CircularProgress, MenuItem, TextField } from '@material-ui/core';
import QRCode from 'react-qr-code';

function QRCodeModal({ closeModal }) {
  const history = useHistory();
  const location = useLocation();
  const [selectedCompany, setSelectedCompany] = useState('');

  const { data, status } = useQuery('companies', getCompanies);

  useEffect(() => {
    const companies = data?.data || [];
    if (companies.length === 1) setSelectedCompany(companies[0].code);
  }, [data?.data]);

  const handleClose = () => {
    history.push(location.pathname);
    closeModal();
  };

  const handleChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const renderContent = () => {
    if (['loading', 'idle'].includes(status))
      return <CircularProgress size='medium' />;

    return (
      <TextField
        fullWidth
        label='Empresa'
        select
        onChange={handleChange}
        value={selectedCompany}
      >
        {data?.data.map((option) => (
          <MenuItem key={option.id} value={option.code}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    );
  };

  return (
    <>
      <DialogTitle id='alert-dialog-title'>
        Obter QR Code da empresa
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Selecione a empresa para gerar o QR Code:
        </DialogContentText>
        {renderContent()}
      </DialogContent>
      {selectedCompany && (
        <DialogContent>
          <Box textAlign='center'>
            <QRCode value={selectedCompany} />
          </Box>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose} color='primary' disabled>
          Imprimir
        </Button>
        <Button onClick={handleClose} color='primary' autoFocus>
          Fechar
        </Button>
      </DialogActions>
    </>
  );
}

export default QRCodeModal;
