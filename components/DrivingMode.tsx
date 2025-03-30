"use client"
import React, { useState } from 'react'
import SearchSection from './SearchSection'
import GoogleMapSection from './GoogleMapSection'

interface Location {
  lat: number;
  lng: number;
}

function DrivingMode() {
  const [source, setSource] = useState<Location | undefined>(undefined);
  const [destination, setDestination] = useState<Location | undefined>(undefined);

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
        <GoogleMapSection source={source} destination={destination} />
      </div>
    </div>
  )
}

export default DrivingMode