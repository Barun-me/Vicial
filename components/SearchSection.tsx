//SearchSection.tsx
import React from 'react'
import { AddressAutocomplete, PlaceDetails } from './AddressAutocomplete'
import { ArrowBigDown, MapPinHouse, MapPlus } from 'lucide-react'

interface SearchSectionProps {
  onSourceSelect: (place: PlaceDetails) => void;
  onDestinationSelect: (place: PlaceDetails) => void;
}
const SearchSection: React.FC<SearchSectionProps> = ({ onSourceSelect, onDestinationSelect }) => {

  // const handlePlaceSelect = (place: PlaceDetails) => {
  //   console.log("Selected place details:", place);
  //   LatLonDetails(place);
  // };

  return (
    <div className='p-3 md:pd-6
    border-[2px] rounded-xl flex flex-col gap-4 bg-white border-black'>
      <p className='flex text-xl font-bold gap-2 justify-center'>Select Here <ArrowBigDown /></p>
      <AddressAutocomplete
        placeholder='Enter the source'
        IconComponent={MapPlus}
        className="flex items-center gap-4 relative"
        onSelect={onSourceSelect}
      />
      <AddressAutocomplete
        placeholder='Enter the destination'
        IconComponent={MapPinHouse}
        className="flex items-center gap-4 relative"
        onSelect={onDestinationSelect}
      />

      <button className='p-3 bg-black w-full mt-5
      text-white rounded-lg'>Search</button>
    </div>
  )
}

export default SearchSection