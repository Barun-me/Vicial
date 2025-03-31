// DrivingMode.tsx
"use client"
import React, { useState } from 'react'
import useSWR from "swr";
import SearchSection from './SearchSection'
import GoogleMapSection from './GoogleMapSection'

interface Location {
  lat: number;
  lng: number;
}
interface ViolenceUpdate {
  _id: string;
  location: Location;
  description: string;
  createdAt: string;
}

// A simple fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());


function DrivingMode() {
  const [source, setSource] = useState<Location | undefined>(undefined);
  const [destination, setDestination] = useState<Location | undefined>(undefined);

  // Poll violence updates every 5 seconds (adjust as needed)
  const { data: violenceUpdates, error } = useSWR<ViolenceUpdate[]>("/api/violence-updates", fetcher, {
    refreshInterval: 5000,
  });
  if (error){
    console.log(error);
    // Handle error state here, e.g., show a message to the user
    return <div>Error loading updates</div>;
  }
  if (!violenceUpdates) return <div>Loading updates...</div>;

  const handleSourceSelect = (place: { geometry: { location: Location } }) => {
    setSource(place.geometry.location);
  };

  const handleDestinationSelect = (place: { geometry: { location: Location } }) => {
    setDestination(place.geometry.location);
  };
  return (
    <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
      <div>
        <SearchSection
          onSourceSelect={handleSourceSelect}
          onDestinationSelect={handleDestinationSelect}
        />
      </div>
      <div className='col-span-2 rounded-2xl'>
        <GoogleMapSection
          source={source}
          destination={destination}
          violenceUpdates={violenceUpdates.map((update) => update.location)}
        />
      </div>
    </div>
  )
}

export default DrivingMode