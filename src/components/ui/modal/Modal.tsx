import { InfoIcon } from '@/components/icons';
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  infoIcon?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  infoIcon = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full"
      >
        <div className="flex justify-between items-center mb-4">
          {title && (
            <div className="text-xl font-bold flex gap-2 items-center">
              {' '}
              {infoIcon && <InfoIcon />} {title}
            </div>
          )}
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};
