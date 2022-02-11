import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useModal from '../../hooks/use-modal';

const useQRCodeModal = () => {
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    if (location.search === '?qrcode') openModal({ modalType: 'qrcode' });
  }, [location, openModal]);
};

export default useQRCodeModal;
