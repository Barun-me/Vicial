// components/ClientProviders.tsx
"use client";

import { APIProvider } from '@vis.gl/react-google-maps';
import { DrivingModeProvider } from '@/contexts/DrivingModeContext';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <DrivingModeProvider>
        {children}
      </DrivingModeProvider>
    </APIProvider>
  );
}
