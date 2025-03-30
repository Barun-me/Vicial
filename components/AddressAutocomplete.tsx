//AddressAutocompleteProps.tsx
"use client"
import React, { useState, Fragment } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const placeDetails = {
  name: "",
  formatted_address: "",
  place_id: "",
  geometry: {
    location: {
      lat: 0,
      lng: 0,
    },
  },
};

export interface PlaceDetails {
  name: string;
  formatted_address: string;
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface AddressAutocompleteProps {
  placeholder?: string;
  IconComponent: React.ComponentType;
  // Optional className for additional styling
  className?: string;
  // Callback to pass the place details once a place is selected.
  onSelect: (place: PlaceDetails) => void;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ placeholder, IconComponent, onSelect, className }) => {
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState<typeof placeDetails | null>(null);

  // Handle changes in the input field
  const handleChange = (newAddress: string): void => {
    setAddress(newAddress);
  };

  // Handle selection of a place from autocomplete
  const handleSelect = async (selectedAddress: string): Promise<void> => {
    setAddress(selectedAddress);
    try {
      // Geocode the selected address to get additional details
      const results: google.maps.GeocoderResult[] = await geocodeByAddress(selectedAddress);
      const latLng: google.maps.LatLngLiteral = await getLatLng(results[0]);

      // Create a place object with details to set in the state
      const place: PlaceDetails = {
        name: results[0].formatted_address,
        formatted_address: results[0].formatted_address,
        place_id: results[0].place_id,
        geometry: {
          location: {
            lat: latLng.lat,
            lng: latLng.lng,
          },
        },
      };

      // Set place details in the state
      setPlace(place);
      // Pass the place details back to the parent component.
      onSelect(place);

    } catch (error) {
      console.error("Error getting address details: ", error);
    }
  };

  return (
    <div className ={className}>
      <IconComponent />
      {/* Google Places Autocomplete input field */}
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="w-full mt-3 mr-5">
            <input
              {...getInputProps({
                placeholder: placeholder,
                className: "p-5 w-full bg-gray-300 border rounded-lg",
              })}
            />
            <div>
              {loading ? <div className="p-4">Loading...</div>

                : <div className="absolute left-0 z-10 mt-1 w-full max-h-70 overflow-y-auto 
                bg-white rounded-lg shadow-lg shadow-gray-800">
                  {suggestions.map((suggestion) => {
                    const SuggestionItemProps = getSuggestionItemProps(suggestion, { className: "p-4 cursor-pointer hover:bg-gray-100" });
                    const { key, ...rest } = SuggestionItemProps;
                    return (
                      <div
                        key={suggestion.placeId}
                        {...rest}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}</div>

              }
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      {/* Display place details
      {place && (
        <div className="mt-20 text-left w-full max-w-[800px]">
          <h2>Address Details</h2>
          <p>
            <strong>Name:</strong> {place.name}
          </p>
          <p>
            <strong>Formatted Address:</strong> {place.formatted_address}
          </p>
          <p>
            <strong>Place ID:</strong> {place.place_id}
          </p>
          <p>
            <strong>Latitude:</strong> {place.geometry.location.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {place.geometry.location.lng}
          </p>
        </div>
      )} */}
    </div>
  );
};