import React from 'react';
import { useQuery } from 'react-query';
import { getShowcase } from '../../service/company';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { ShowCase, Container, CompanyCard, Title } from './dashboard.styles';

function CustomerDashboard() {
  const { data, isLoading } = useQuery('companies', getShowcase);

  if (isLoading)
    return (
      <Container>
        <CircularProgress />
        <Typography variant='overline'>
          Por favor aguarde, estamos carregando nossos parceiros...
        </Typography>
      </Container>
    );

  const withPhoto = data.data.filter((company) => !!company.picture_url);
  const withoutPhoto = data.data.filter((company) => !company.picture_url);

  if (withPhoto.length === 0 && withoutPhoto.length === 0)
    return (
      <Container>
        <Title variant='overline'>Nenhum parceiro encontrado.</Title>
      </Container>
    );

  return (
    <Container>
      {withPhoto.length > 0 && (
        <>
          <Title align='center' variant='overline'>
            Nossos parceiros:
          </Title>

          <ShowCase>
            {withPhoto.map((company) => (
              <CompanyCard key={company.id}>
                <img src={company.picture_url} alt={company.name} />
              </CompanyCard>
            ))}
          </ShowCase>
        </>
      )}

      <Box mt={3} textAlign='center'>
        {withoutPhoto.length > 0 && (
          <>
            <Title align='center' variant='overline'>
              Outros parceiros:
            </Title>
            <ShowCase>
              {withoutPhoto.map((company) => (
                <Typography component='span' variant='body1' key={company.id}>
                  {company.name}
                </Typography>
              ))}
            </ShowCase>
          </>
        )}
      </Box>
    </Container>
  );
}

export default CustomerDashboard;
