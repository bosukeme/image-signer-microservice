'use client'

import { useState } from "react";
import { BASE_URL } from "../lib/config";


interface Props {
    selectedImage: string;
}

export default function SignatureForm({ selectedImage }: Props) {
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async () => {
        setStatus("Submitting...");

        const payload = {
            imageName: selectedImage,
            email,
            text
        };

        try {

            const res = await fetch(`${BASE_URL}/imageSign`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Submission failed");
            }

            const data = await res.json();
            setEmail("");
            setText("");
            setStatus(data.message || "Submitted!");


        } catch (error: unknown) {
            if (error instanceof Error) {
                setStatus(`Error: ${error.message}`);
            } else {

                setStatus(`Error: "Something went wrong"}`);
            }

        }
    };

    return (

        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="space-y-4"
        >
            <input
                type="email"
                className="border p-2 w-full rounded-md"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                className="border p-2 w-full rounded-md"
                placeholder="Text to appear on image"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                disabled={status === "Submitting..."}
            >
                Submit
            </button>

            {status === "Submitting..." ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-blue-600">Submitting...</p>
                </div>
            ) : (
                status && <p className="text-sm">{status}</p>
            )}
        </form>

    );
}
