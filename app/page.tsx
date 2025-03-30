"use client";
import DrivingMode from "@/components/DrivingMode";
import Header from "@/components/Header";
import NonDrivingMode from "@/components/NonDrivingMode";
import { useDrivingMode } from "@/contexts/DrivingModeContext";

export default function Home() {
  const { isDriving } = useDrivingMode();
  return (
    <>
      <Header />
      <div className="bg-gray-200">
        {isDriving ? <DrivingMode /> : <NonDrivingMode />}
      </div>
    </>
  );
}
