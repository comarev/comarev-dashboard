import React, { createContext, useCallback, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import QRCodeModal from '../components/qrcode-modal/qrcode-modal.component';

export const ModalContext = createContext(undefined);

function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState(null);

  const openModal = useCallback((options) => {
    if (options) setModalOptions(options);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const value = {
    open,
    openModal,
    closeModal,
  };

  const renderModalContent = () => {
    switch (modalOptions?.modalType) {
      case 'qrcode':
        return <QRCodeModal closeModal={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Dialog open={open} onClose={closeModal} maxWidth='sm' fullWidth>
        {renderModalContent()}
      </Dialog>
    </ModalContext.Provider>
  );
}

export default ModalProvider;
