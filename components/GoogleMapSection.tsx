"use client";
import React, { useEffect, useRef } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface GoogleMapSectionProps {
  source?: Location;
  destination?: Location;
  // List of violence update locations to check against the route
  violenceUpdates?: Location[];
}

function GoogleMapSection({ source, destination, violenceUpdates = [] }: GoogleMapSectionProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // To store our map instance
  const mapRef = useRef<google.maps.Map | null>(null);
  // To store markers for source, destination, and violence updates
  const markersRef = useRef<google.maps.Marker[]>([]);
  // To store the directions renderer
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  // Initialize the map once when the component mounts.
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current && window.google) {
      mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: -33.860664, lng: 151.208138 },
        zoom: 13,
      });
    }
  }, []);

  // Update markers and route whenever the source, destination, or violenceUpdates change.
  useEffect(() => {
    if (mapRef.current && window.google) {
      // Clear any existing markers.
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Add marker for source.
      if (source) {
        const markerSource = new window.google.maps.Marker({
          position: source,
          map: mapRef.current,
          label: "S", // S for Source
        });
        markersRef.current.push(markerSource);
      }

      // Add marker for destination.
      if (destination) {
        const markerDest = new window.google.maps.Marker({
          position: destination,
          map: mapRef.current,
          label: "D", // D for Destination
        });
        markersRef.current.push(markerDest);
      }

      // If both source and destination exist, request directions.
      if (source && destination) {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: source,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK && result) {
              // Clear previous directions if any.
              if (directionsRendererRef.current) {
                directionsRendererRef.current.setMap(null);
              }
              // Create and display new directions.
              const directionsRenderer = new window.google.maps.DirectionsRenderer({
                suppressMarkers: true, // We already add custom markers.
                polylineOptions: {
                  strokeColor: "#0000FF",
                  strokeWeight: 5,
                },
              });
              directionsRenderer.setMap(mapRef.current);
              directionsRenderer.setDirections(result);
              directionsRendererRef.current = directionsRenderer;
              // Now, check if any violence update falls on the route.
              // Get the route overview path.
              const routePath = result.routes[0].overview_path;
              // Create a temporary polyline from the route path.
              const polyline = new window.google.maps.Polyline({ path: routePath });
              // Define a tolerance in degrees (adjust as needed).
              const tolerance = 0.005;

              violenceUpdates.forEach((update) => {
                const point = new window.google.maps.LatLng(update.lat, update.lng);
                // Check if the update location is on (or near) the route.
                if (window.google.maps.geometry.poly.isLocationOnEdge(point, polyline, tolerance)) {
                  // Create a marker for the violence update.
                  const updateMarker = new window.google.maps.Marker({
                    position: update,
                    map: mapRef.current,
                    // Use a custom blue marker icon URL, or you can change the label.
                    icon: {
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    },
                  });
                  markersRef.current.push(updateMarker);
                }
              });
            } else {
              console.error("Directions request failed due to", status);
            }
          }
        );
      } else {
        // If one of the points is missing, clear any existing directions.
        if (directionsRendererRef.current) {
          directionsRendererRef.current.setMap(null);
          directionsRendererRef.current = null;
        }
      }
    }
  }, [source, destination, violenceUpdates]);


  return (
    <div
      style={{
        borderRadius: "15px", // Adjust the radius as needed
        overflow: "hidden",   // Hide the overflowing corners of the map
        height: "600px",
        width: "100%",
      }}
      className="border-4 border-green-500"
    >
      <div
        ref={mapContainerRef}
        style={{ height: "600px", width: "100%" }}
      />
    </div>
  );
}

export default GoogleMapSection;
