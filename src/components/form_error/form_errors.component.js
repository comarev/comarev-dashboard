import React from 'react';
import { Container } from './styles';

const FormErrors = ({ action, errors }) => {
  const title =
    errors.length > 1
      ? `Alguns erros impediram o(a) ${action}:`
      : `Houve um erro que impediu o(a) ${action}:`;

  return (
    <Container>
      <h3>{title}</h3>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </Container>
  );
};

export default FormErrors;
