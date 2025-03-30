//action.tsx
"use server";
import { imagekit } from "@/utils";
import dbConnect from "@/lib/dbConnect";
import { ViolenceUpdate } from "@/models/ViolenceUpdate"; // Note: Import the model as default export

export const shareAction = async (formData: FormData) => {
    await dbConnect();

    const file = formData.get("file") as File;
    if (!file) {
        throw new Error("File is missing in the form data");
    }

    // Read file as buffer.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Wrap the image upload in a Promise so we can await it.
    const uploadResult = await new Promise<any>((resolve, reject) => {
        imagekit.upload(
            {
                file: buffer,
                fileName: file.name,
                folder: "/posts",
                transformation: {
                    pre: "w-600",
                },
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });

    try {
        // Extract form fields.
        const desc = formData.get("desc")?.toString();
        // Use the URL returned by ImageKit.
        const imageUrl = uploadResult.url;
        const locationLat = formData.get("locationLat")?.toString();
        const locationLng = formData.get("locationLng")?.toString();
        const locationAddress = formData.get("locationAddress")?.toString();
        const date = formData.get("date")?.toString();

        if (!desc) {
            throw new Error("Description is required");
        }
        if (!imageUrl) {
            throw new Error("Image URL is required");
        }
        if (!locationLat || !locationLng) {
            throw new Error("Location coordinates are required");
        }

        // Create a new ViolenceUpdate document.
        const newUpdate = await ViolenceUpdate.create({
            desc,
            imageUrl,
            location:
                locationLat && locationLng
                    ? {
                        lat: parseFloat(locationLat),
                        lng: parseFloat(locationLng),
                        address: locationAddress || "",
                    }
                    : undefined,
            date: date ? new Date(date) : undefined,
        });

    } catch (error) {
        console.error("Error creating ViolenceUpdate:", error);
        throw error; // rethrow error if needed
    }
};
