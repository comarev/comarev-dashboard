import React from 'react';
import Template from '../../components/template/template.component';
import { getInvoice } from '../../service/invoice';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CircularProgress } from '@material-ui/core';
import Invoice from '../../components/invoice/invoice.component';

const InvoiceView = () => {
  const params = useParams();

  const { data, status } = useQuery(['invoice-view', { id: params.id }], () =>
    getInvoice(params.id)
  );
  const isLoading = ['idle', 'loading'].includes(status);

  const render = () => {
    if (isLoading)
      return (
        <Template>
          <CircularProgress testid='invoice-view-spinner' size={25} />
        </Template>
      );

    return (
      <Template title={`Visualizar fatura de ${data?.data.user.full_name}`}>
        <Invoice invoice={data?.data} />
      </Template>
    );
  };

  return render();
};

export default InvoiceView;
