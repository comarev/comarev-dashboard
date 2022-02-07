import service from '../service/api';
import { parseCurrency } from '../utils/parsers/general';

const parseInvoice = (invoice) => ({
  ...invoice,
  amount: parseCurrency(invoice.amount),
});

const getInvoices = async () => {
  return await service.get('/invoices');
};

const getInvoice = async (id) => {
  return await service.get(`/invoices/${id}`);
};

const registerInvoice = async (invoice) => {
  return await service.post('/invoices', { invoice: parseInvoice(invoice) });
};

const updateInvoice = async (invoice) => {
  return await service.patch(`/invoices/${invoice.id}`, {
    invoice: parseInvoice(invoice),
  });
};

export { getInvoices, registerInvoice, getInvoice, updateInvoice };
