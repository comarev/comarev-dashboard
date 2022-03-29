import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RHFInput from 'components/rhf-input/rhf-input.component';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress, Box, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getUsers } from 'service/user';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { UploadContainer } from './company-form.styles';

const Steps = {
  Form: 1,
  Avatar: 2,
};

const statusOptions = [
  { value: true, label: 'Ativa' },
  { value: false, label: 'Desativada' },
];

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  cnpj: yup.string().required('Campo obrigatório'),
  address: yup.string(),
  phone: yup.string(),
  discount: yup.string().required('Campo obrigatório'),
  active: yup.string().required('Campo obrigatório'),
});

const CompanyForm = ({ onSubmit, loading, company }) => {
  const {
    control,
    getValues,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...company,
      managers: company?.managers,
      regulars: company?.regulars,
      avatar: undefined,
    },
    mode: 'onBlur',
  });
  const user = useSelector((state) => state.user);
  const [currentStep, setCurrentStep] = useState(Steps.Form);

  const editing = !!company;

  const { data } = useQuery('users', getUsers, { enabled: user.admin });

  const managerIds = watch('managers')?.map((manager) => manager.id) || [];
  const employeeIds = watch('regulars')?.map((employee) => employee.id) || [];
  const avatar = watch('avatar');

  const getButtonValue = () => {
    if (currentStep === Steps.Form) return 'Continuar';
    if (editing) return 'Atualizar Empresa';

    return 'Cadastrar Empresa';
  };
  const buttonValue = getButtonValue();
  const values = getValues();

  const renderStep = () => {
    if (currentStep === Steps.Form)
      return (
        <form>
          <Grid
            container
            spacing={1}
            direction='row'
            justifycontent='center'
          >
            <Grid item xs={12} md={6} lg={5}>
              <RHFInput
                name='name'
                label='Razão Social'
                autoFocus
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <RHFInput
                name='cnpj'
                label='CNPJ'
                control={control}
                mask='99.999.999/9999-99'
              />
            </Grid>
            {editing && (
              <Grid item xs={12} md={6} lg={3}>
                <RHFInput
                  name='code'
                  label='Código'
                  control={control}
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <RHFInput
                name='address'
                label='Endereço'
                control={control}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFInput
                name='phone'
                label='Telefone'
                control={control}
                mask='(99) 9999-9999'
              />
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              <RHFInput
                name='discount'
                label='Desconto (%)'
                type='number'
                control={control}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid item xs={12} md={3} lg={2}>
              <RHFInput
                name='active'
                label='Status'
                select
                control={control}
                defaultValue={true}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFInput>
            </Grid>
            <Grid item xs={12} lg={8}></Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disabled={!user.admin}
                multiple
                id='company-managers'
                options={data?.data || []}
                getOptionLabel={(option) => option.full_name}
                getOptionSelected={(option, value) => option.id === value.id}
                defaultValue={company?.managers}
                filterSelectedOptions
                onChange={(e, values) => setValue('managers', values)}
                getOptionDisabled={(option) => employeeIds.includes(option.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    label='Gerentes'
                    placeholder='Selecione os gerentes da empresa'
                    margin='normal'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disabled={!user.admin}
                multiple
                id='company-employees'
                options={data?.data || []}
                getOptionLabel={(option) => option.full_name}
                getOptionSelected={(option, value) => option.id === value.id}
                defaultValue={company?.regulars}
                filterSelectedOptions
                onChange={(e, values) => setValue('regulars', values)}
                getOptionDisabled={(option) => managerIds.includes(option.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    label='Funcionários'
                    placeholder='Selecione os funcionários da empresa'
                    margin='normal'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display='flex' justifyContent='flex-end'>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!isValid}
                  aria-label='Continuar'
                  onClick={() => setCurrentStep(Steps.Avatar)}
                >
                  {buttonValue}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      );

    return (
      <>
        <Dropzone
          accept={['image/png', 'image/jpg', 'image/jpeg']}
          onDrop={(acceptedFiles) => setValue('avatar', acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <UploadContainer {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                {avatar
                  ? avatar.name
                  : 'Clique ou arraste aqui a logo da empresa (opcional)'}
              </p>
            </UploadContainer>
          )}
        </Dropzone>
        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button
            variant='contained'
            color='primary'
            disabled={loading}
            onClick={() => {
              onSubmit(values);
            }}
          >
            {loading ? (
              <CircularProgress testid='company-register-spinner' size={25} />
            ) : (
              buttonValue
            )}
          </Button>
        </Box>
      </>
    );
  };

  return renderStep();
};

export default CompanyForm;
