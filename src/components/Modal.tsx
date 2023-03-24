import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

import { CloseOutlined } from '@ant-design/icons';

interface IProps {
  showModal: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ showModal = false, onClose, children }: IProps) => {
  let modalRef: any = null;

  const handleClose = (e: any) => {
    if (modalRef && !modalRef.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClose, { capture: true });
    return () => {
      document.removeEventListener('click', handleClose, { capture: true });
    };
  }, []);

  return (
    <ModalWrapper>
      <div className="modal-box" ref={(node) => (modalRef = node)}>
        <CloseIcon onClick={onClose} />
        {children}
      </div>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #091e428a;

  .modal-box {
    background-color: var(--theme-column-modal);
    box-shadow: 0 0 15 rgba(0, 0, 0, 0.2);
    padding: 24px;
    border-radius: 16px;
    position: relative;

    /* width: 1000px;
    height: 500px; */

    animation-name: grow-box;
    animation-duration: 0.2s;
    animation-timing-function: ease-in-out;

    @keyframes grow-box {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

const CloseIcon = styled(CloseOutlined)`
  position: absolute;
  top: 24px;
  right: 24px;

  &:hover {
    opacity: 0.5;
  }
`;
