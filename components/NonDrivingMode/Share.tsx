// Share.tsx
"use client";
import React, { FormEvent, useState, useTransition } from "react";
import Image from "./Image";
import { CalendarCheck2, HeartCrack, MapPinned, Upload } from "lucide-react";
import { shareAction } from "./action";
import NextImage from "next/image";
import ImageEditor from "./ImageEditor";
import { AddressAutocomplete, PlaceDetails } from "../AddressAutocomplete";
import { useRouter } from "next/navigation";

function Share() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [description, setDescription] = useState<string>("");
  // State to hold the selected file
  const [file, setFile] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [settings, setSettings] = useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({
    type: "original",
    sensitive: false,
  });
  // State to hold selected location details from autocomplete
  const [location, setLocation] = useState<PlaceDetails | null>(null);
  // State to hold the selected date as string
  const [date, setDate] = useState<string>("");

  const handelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const previewURL = file ? URL.createObjectURL(file) : null;

  // Callback when a location is selected via the AddressAutocomplete component
  const handleLocationSelect = (place: PlaceDetails) => {
    setLocation(place);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("desc", description);
    if (file) formData.append("file", file);
    if (location) {
      formData.append("locationLat", location.geometry.location.lat.toString());
      formData.append("locationLng", location.geometry.location.lng.toString());
      formData.append("locationAddress", location.formatted_address);
    }
    if (date) formData.append("date", date);
    // Add other settings if needed
    try {
      // Call the server action to share the post.
      await shareAction(formData);
      // Reset local state.
      setDescription("");
      setFile(null);
      setLocation(null);
      setDate("");

      // Optionally, reset other states like settings if desired.
      // Refresh the Middlebar (which includes Feed and Share) without a full page reload.
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  return (
    <form
      className="p-4"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="pl-7 pt-4 pr-7">
        {/* AVATAR */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image path="general/male1.jpg" alt="" w={100} h={100} tr={true} />
        </div>
        {/* OTHERS */}
        <div className="flex-1 flex flex-col gap-4">
          <textarea
            name="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={300}
            placeholder="What is happening?!"
            className="w-full bg-transparent outline-none text-xl resize-none"
            rows={3}
          />

          {/* Hidden inputs for location and date */}
          {location && (
            <>
              <input type="hidden" name="locationLat" value={location.geometry.location.lat} />
              <input type="hidden" name="locationLng" value={location.geometry.location.lng} />
              <input type="text" name="locationAddress" value={location.formatted_address} />
            </>
          )}
          {date && <input type="text" name="date" value={date} />}

          {/* PREVIEW IMAGE */}
          {file?.type.includes("image") && previewURL && (
            <div className="relative rounded-xl overflow-hidden">
              <NextImage src={previewURL} alt="" width={350} height={350} />
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer">
                <button type="button" onClick={() => setIsEditorOpen(true)}>
                  Edit
                </button>
              </div>
              <div className="absolute top-2 right-40 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm">
                X
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-4 flex-wrap">
              <input type="file" name="file" onChange={handelFileChange} className="hidden cursor-pointer" id="file" />
              <span className="group">
                <span className="group-hover:text-blue-700 cursor-pointer">
                  <label htmlFor="file">
                    <Upload />
                  </label>
                </span>
              </span>
              <span className="group">
                <span className="group-hover:text-red-600 cursor-pointer">
                  <HeartCrack />
                </span>
              </span>
              <span className="group">
                <span className="group-hover:text-gray-500 cursor-pointer">
                  <CalendarCheck2 onClick={() => setIsDateOpen(true)} />
                </span>
              </span>
              <span className="group">
                <span className="group-hover:text-green-700 cursor-pointer">
                  <button type="button" onClick={() => setIsLocationOpen(true)}>
                    <MapPinned />
                  </button>
                </span>
              </span>
              {isLocationOpen && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  {/* Transparent background overlay */}
                  <div className="absolute inset-0 bg-black opacity-75"></div>
                  {/* Modal content with full opacity */}
                  <div className="relative bg-white w-1/2 h-1/2 rounded-xl flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">Location</h1>
                    <AddressAutocomplete
                      placeholder="Enter the location"
                      IconComponent={MapPinned}
                      onSelect={handleLocationSelect}
                    />
                    <button
                      type="button"
                      onClick={() => setIsLocationOpen(false)}
                      className="mt-4 bg-blue-500 text-white rounded-full font-bold py-2 px-4 cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

              {isDateOpen && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  {/* Transparent background overlay */}
                  <div className="absolute inset-0 bg-black opacity-75"></div>
                  {/* Modal content with full opacity */}
                  <div className="relative bg-white w-1/2 h-1/2 rounded-xl flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold">Select Date</h1>
                    <input
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                      className="p-4 border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setIsDateOpen(false)}
                      className="bg-blue-500 text-white rounded-full font-bold py-2 px-4 cursor-pointer mt-4"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button type="submit" className="bg-black text-white rounded-full font-bold py-2 px-4 cursor-pointer">
              Post
            </button>
          </div>
        </div>
      </div>
    </form >
  );
}

export default Share;
