import service from '../service/api';
import { parseCurrency } from '../utils/parsers/general';

const parseInvoice = (invoice) => ({
  ...invoice,
  amount: parseCurrency(invoice.amount).trim(),
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

const checkInvoices = async (code) => {
  return await service.post(`/check_invoices?code=${code}`);
};

export {
  getInvoices,
  registerInvoice,
  getInvoice,
  updateInvoice,
  checkInvoices,
};
