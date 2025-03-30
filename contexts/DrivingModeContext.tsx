// contexts/DrivingModeContext.tsx
"use client";
import React, { createContext, useContext, useState, type ReactNode } from 'react';

type DrivingModeContextType = {
  isDriving: boolean;
  setIsDriving: (value: boolean) => void;
};

const DrivingModeContext = createContext<DrivingModeContextType | undefined>(undefined);

export const DrivingModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDriving, setIsDriving] = useState<boolean>(false);
  return (
    <DrivingModeContext.Provider value={{ isDriving, setIsDriving }}>
      {children}
    </DrivingModeContext.Provider>
  );
};

export const useDrivingMode = () => {
  const context = useContext(DrivingModeContext);
  if (!context) {
    throw new Error("useDrivingMode must be used within a DrivingModeProvider");
  }
  return context;
};
