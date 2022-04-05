import useQRCodeModal from 'components/qrcode-modal/use-qrcode-modal';

function AppProvider({ children }) {
  useQRCodeModal();

  return children;
}

export default AppProvider;
