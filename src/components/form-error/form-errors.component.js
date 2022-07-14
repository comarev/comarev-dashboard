import React from 'react';
import { Container } from './styles';

const FormErrors = ({ action, errors }) => {

  return (
    <Container>
      <h4>Alguns erros impediram o(a) {action}.</h4>
      <p>{errors.message ? errors.message : errors}</p>
    </Container>
  );
};

export default FormErrors;
