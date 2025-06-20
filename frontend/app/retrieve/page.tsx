'use client'

import { useState } from "react";
import ImageResult from "../components/ImageResult";
import { BASE_URL } from "../lib/config";


export default function Retrieve() {
    const [objectId, setObjectId] = useState("");
    const [imageData, setImageData] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);


    const handleFetch = async () => {
        if (!isValidObjectId(objectId)) {
            setValidationError("Invalid Object ID. It should be a 24-character hexadecimal string.");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/image/${objectId}`);
            console.log(res);
            console.log(BASE_URL);
            
            if (!res.ok) throw new Error("Image not found");

            const data = await res.json();

            setImageData(data.cloudinaryUrl);
            setValidationError(null);
        } catch (error) {
            console.log(`Error retrieving ${error}`);
            
            setValidationError("Failed to retrieve image. Please check the Object ID and try again.");
        }

    };

    const isValidObjectId = (id: string): boolean => {
        return /^[a-f\d]{24}$/i.test(id);
    };


    return (
        <main className="p-6 max-w-xl mx-auto">
            <h1 className="text-4xl text-center font-bold mb-4">Retrieve Processed Image</h1>
            <input
                className="border p-2 w-full mb-4 rounded-md"
                placeholder="Enter Object ID"
                value={objectId}
                onChange={(e) => setObjectId(e.target.value)}
            />
            {validationError && (
                <p className="text-red-600 text-sm mt-2 mb-2">{validationError}</p>
            )}
            <button
                onClick={handleFetch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
            >
                Fetch Image
            </button>
            <div className="mt-2">

                {imageData && <ImageResult src={imageData} />}
            </div>
        </main>
    );
}
