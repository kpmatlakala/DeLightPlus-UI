import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  const className = variant === 'primary'
    ? 'bg-blue-600 text-white px-4 py-2 rounded'
    : 'border border-blue-600 text-blue-600 px-4 py-2 rounded';

  return <button onClick={onClick} className={className}>{children}</button>;
};
