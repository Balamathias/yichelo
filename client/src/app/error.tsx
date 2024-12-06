'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideRepeat } from 'lucide-react';

interface ErrorComponentProps {
  reset?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ reset }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border min-h-screen">
      <h2 className="text-lg font-semibold text-primary">Something&#39;s gone wrong!</h2>
      <p className="mt-2 text-muted-foreground">In an attempt to render this page to you, we encountered an error which made the little endeavor to fail nevertheless; we assure you that our Engineers are working to resolve it.</p>
      {reset && (
        <Button
          onClick={reset}
          className="mt-4 px-4 py-2 rounded-xl"
          variant={'secondary'}
          size={'lg'}
        >
          <LucideRepeat size={16} className="mr-2" />
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorComponent;
