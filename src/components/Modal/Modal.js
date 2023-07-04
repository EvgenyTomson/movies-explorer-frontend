import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';

const Modal = ({ onClose, modalText }) => {
  return (
    createPortal(<ModalContent onClose={onClose} modalText={modalText} />, document.body)
  )
};

export default Modal;
