import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  Reader,
  BackButtonContainer,
  LoadingContainer,
  Wrapper,
  SuccessText,
  MarkContainer,
  ErrorText,
  Container,
} from './scanner-styles';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { checkInvoices } from '../../service/invoice';
import { useMutation } from 'react-query';
import SuccessCheck from '../../components/success-check/success-check';
import ErrorCheck from '../../components/error-check/error-check';

const config = {
  fps: 10,
  qrbox: { width: 250, height: 250 },
  aspectRatio: 1.0,
};

const Views = {
  Scanner: 1,
  Success: 2,
  Error: 3,
};

function Scanner() {
  const history = useHistory();
  const html5QrCodeRef = useRef();
  const [view, setView] = useState(Views.Scanner);

  const onSuccess = () => {
    html5QrCodeRef.current.stop();
    setView(Views.Success);
  };

  const onError = () => {
    html5QrCodeRef.current.stop();
    setView(Views.Error);
  };

  const {
    mutateAsync,
    data,
    isLoading: processingCode,
  } = useMutation('check_invoices', checkInvoices, {
    onSuccess,
    onError,
  });

  const handleBack = () => {
    html5QrCodeRef.current.stop();
    history.push('/');
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode('reader', /* verbose= */ false);
    html5QrCodeRef.current = html5QrCode;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          // const cameraId = devices[0].id;
          html5QrCode.start({ facingMode: 'environment' }, config, (code) =>
            mutateAsync(code)
          );
        }
      })
      .catch((err) => {
        alert('Tivemos um problema ao detectar sua câmera!');
      });
  }, [mutateAsync]);

  const Loading = () => (
    <LoadingContainer>
      <CircularProgress />
      <Typography variant='overline'>Por favor aguarde...</Typography>
    </LoadingContainer>
  );

  if (view === Views.Success) {
    if (processingCode) return <Loading />;

    const { name, discount } = data.data;

    return (
      <Container>
        <Wrapper>
          <MarkContainer>
            <SuccessCheck />
            <SuccessText variant='h6'>
              {discount}% de desconto no(a) {name}!
            </SuccessText>
          </MarkContainer>
          <Button variant='outlined' onClick={() => history.push('/')}>
            Voltar
          </Button>
        </Wrapper>
      </Container>
    );
  }

  if (view === Views.Error)
    return (
      <Container>
        <Wrapper>
          <MarkContainer>
            <ErrorCheck />
            <ErrorText variant='h6'>Contate a COMAREV!</ErrorText>
          </MarkContainer>
          <Button variant='outlined' onClick={() => history.push('/')}>
            Voltar
          </Button>
        </Wrapper>
      </Container>
    );

  return (
    <>
      <Reader>
        <div id='reader' style={{ width: '100%' }}></div>
        <BackButtonContainer>
          <Button variant='contained' onClick={handleBack}>
            Sair da câmera
          </Button>
        </BackButtonContainer>
        {processingCode && <Loading />}
      </Reader>
    </>
  );
}

export default Scanner;
