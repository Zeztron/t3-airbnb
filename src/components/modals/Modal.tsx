'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleModalClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        handleModalClose();
      }
    },
    [handleModalClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none'>
      <div className='relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5'>
        {/* Content */}
        <div
          className={`translate h-full duration-300 ${
            showModal ? 'translate-y-0' : 'translate-y-full'
          } ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            ref={modalContentRef}
            className='translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto'
          >
            {/* Header */}
            <div className='relative flex items-center justify-center rounded-t border-b-[1px] p-6'>
              <button
                className='absolute left-9 border-0 p-1 transition hover:opacity-70'
                onClick={handleModalClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className='text-lg font-semibold'>{title}</div>
            </div>
            {/* Body */}
            <div className='relative flex-auto p-6'>{body}</div>
            {/* Footer */}
            <div className='flex flex-col gap-2 p-6'>
              <div className='flex w-full flex-row items-center gap-4'>
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
