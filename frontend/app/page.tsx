'use client'

import { useState } from "react";
import ImageSelector from "./components/ImageSelector";
import SignatureForm from "./components/SignatureForm";


export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handleSelect = (id: string) => {
    setSelectedImage(prev => (prev === id ? null : id));
  }
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">Select an Image</h1>
      <ImageSelector onSelect={handleSelect} selected={selectedImage} />
      {selectedImage && <SignatureForm selectedImage={selectedImage} />}
    </main>
  );
}
