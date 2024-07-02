import React, { useState, useEffect, ReactNode } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: string;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, height = 'h-1/2' }) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setIsRendered(true);
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) setIsRendered(false);
  };

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 animate-slide-in-bottom"
         style={{ opacity: isOpen ? 1 : 0 }}
         onClick={onClose}>
      <div
        className={`fixed bottom-0 left-0 right-0 ${height} bg-white rounded-t-2xl shadow-lg transform transition-transform duration-500 ease-in-out`}
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="p-4 h-full">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
          {children}
        </div>
      </div>
    </div>
  );
};
