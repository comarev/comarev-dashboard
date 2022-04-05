import { useContext } from 'react';
import { ModalContext } from 'providers/custom-modal-provider';

const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};

export default useModal;
