import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getShowcase } from '../../service/company';
import { CircularProgress, TextField, Typography } from '@material-ui/core';
import {
  ShowCase,
  Container,
  CompanyCard,
  Title,
  CompanyInfo,
  Discount,
  CompanyInfoWrapper,
} from './dashboard.styles';
import NoImage from '../../assets/images/no-image.jpg';

function CustomerDashboard() {
  const { data, isLoading } = useQuery('companies', getShowcase);
  const [term, setTerm] = useState('');

  if (isLoading)
    return (
      <Container>
        <CircularProgress />
        <Typography variant='overline'>
          Por favor aguarde, estamos carregando nossos parceiros...
        </Typography>
      </Container>
    );

  const partners = data.data.filter((partner) => {
    const name = partner.name.toLowerCase();
    const searchTerm = term.toLowerCase();

    return name.includes(searchTerm.trim()) || name.startsWith(searchTerm);
  });

  if (partners.length === 0 && !term)
    return (
      <Container>
        <Title variant='overline'>Nenhum parceiro encontrado.</Title>
      </Container>
    );

  return (
    <Container>
      <>
        <Title align='center' variant='overline'>
          Nossos parceiros:
        </Title>

        <TextField
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder='Digite o nome da empresa'
        />

        {partners.length === 0 ? (
          <Container>
            <Title variant='overline'>
              Nenhum parceiro encontrado com o termo "{term}".
            </Title>
          </Container>
        ) : (
          <ShowCase>
            {partners.map((company) => (
              <CompanyCard key={company.id}>
                <Discount>
                  <Typography variant='h6'>({company.discount})%</Typography>
                </Discount>
                <img src={company.picture_url || NoImage} alt={company.name} />
                <CompanyInfoWrapper>
                  <CompanyInfo variant='button'>
                    {company.name} <span>({company.discount})%</span>
                  </CompanyInfo>
                </CompanyInfoWrapper>
              </CompanyCard>
            ))}
          </ShowCase>
        )}
      </>
    </Container>
  );
}

export default CustomerDashboard;
