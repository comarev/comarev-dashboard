import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useController } from 'react-hook-form';

const RHFInput = ({
  children,
  label,
  name,
  control,
  dataTestId,
  required = false,
  defaultValue = '',
  ...textFieldProps
}) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: { required },
    defaultValue: defaultValue,
  });

  return (
    <TextField
      {...textFieldProps}
      {...inputProps}
      inputRef={ref}
      label={label}
      inputProps={{ 'data-testid': dataTestId }}
      error={!!error}
      helperText={error?.message || ''}
      variant='outlined'
      margin='normal'
      fullWidth
    >
      {children}
    </TextField>
  );
};

export default RHFInput;
