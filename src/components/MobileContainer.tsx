import { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <div className={`mx-auto max-w-sm w-full min-h-screen bg-white shadow-xl ${className}`}>
      {children}
    </div>
  );
}