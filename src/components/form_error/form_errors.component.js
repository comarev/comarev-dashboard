import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const FormErrors = ({ action, errors }) => {
  const message =
    errors.length > 1
      ? `Alguns erros impediram o(a) ${action}:`
      : `Houve um erro que impediu o(a) ${action}:`;

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='h2'>
          {message}
        </Typography>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FormErrors;
