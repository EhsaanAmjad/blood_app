// Packages
import React, { useEffect, useRef } from 'react';

const DEFAULT_DROPDOWN_CONTENT_CLASS = 'w3-dropdown-content w3-bar-block w3-border max-h-[400px]';

export default function Dropdown({
  className = '',
  children,
  _isOpen,
  isOpen,
  buttonContent,
}) {

  const dropdownRef = useRef(null);

  /****** Handlers ******/

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      _isOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      className="w3-dropdown-click relative select-none"
      ref={dropdownRef}
      role="menu"
      aria-hidden={!isOpen}
    >

      {/* dropdown button */}

      {buttonContent}

      {/* dropdown content */}

      <div
        className={`${DEFAULT_DROPDOWN_CONTENT_CLASS} ${isOpen ? 'w3-show' : ''} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
