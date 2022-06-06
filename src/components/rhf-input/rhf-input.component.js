import React from 'react';
import { TextField } from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useController } from 'react-hook-form';
import InputMask from 'react-input-mask';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const CurrencyInput = (props) => {
  const { inputRef, ...other } = props;

  const currencyMask = createNumberMask({
    prefix: 'R$',
    decimalLimit: 2,
    thousandsSeparatorSymbol: '.',
    includeThousandsSeparator: true,
    decimalSymbol: ',',
    allowNegative: false,
    allowDecimal: true,
  });

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={currencyMask}
    />
  );
};

const RHFInput = ({
  children,
  label,
  name,
  control,
  dataTestId,
  required = false,
  defaultValue = '',
  mask,
  checkbox = false,
  currencyInput,
  beforeMaskedValueChange,
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

  if (currencyInput) {
    return (
      <TextField
        {...textFieldProps}
        {...inputProps}
        label={label}
        inputProps={{
          ...textFieldProps.inputProps,
          'data-testid': dataTestId,
        }}
        InputProps={{
          ...textFieldProps.InputProps,
          inputComponent: CurrencyInput,
        }}
        error={!!error}
        helperText={error?.message || ''}
        variant='standard'
        fullWidth
        margin='normal'
      >
        {children}
      </TextField>
    );
  }

  if (mask) {
    return (
      <InputMask
        maskChar=''
        mask={mask}
        {...inputProps}
        beforeMaskedValueChange={beforeMaskedValueChange}
      >
        {(maskProps) => (
          <TextField
            {...maskProps}
            {...textFieldProps}
            inputRef={ref}
            label={label}
            inputProps={{
              ...textFieldProps.inputProps,
              'data-testid': dataTestId,
            }}
            error={!!error}
            helperText={error?.message || ''}
            variant='standard'
            fullWidth
            margin='normal'
          >
            {children}
          </TextField>
        )}
      </InputMask>
    );
  }

  if (checkbox) {
    return (
      <FormControlLabel
        control={<Checkbox {...inputProps} inputRef={ref} name={name} />}
        label={label}
      />
    );
  }

  return (
    <TextField
      {...textFieldProps}
      {...inputProps}
      inputRef={ref}
      label={label}
      inputProps={{ ...textFieldProps.inputProps, 'data-testid': dataTestId }}
      error={!!error}
      helperText={error?.message || ''}
      variant='standard'
      fullWidth
      margin='normal'
    >
      {children}
    </TextField>
  );
};

export default RHFInput;
