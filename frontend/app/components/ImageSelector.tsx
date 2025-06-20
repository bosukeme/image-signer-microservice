import Image from "next/image";

interface Props {
    selected: string | null;
    onSelect: (id: string) => void;
}

export default function ImageSelector({ selected, onSelect }: Props) {
    const images = ["/light_bg_txt.png", "/dark_bg_txt.png"];

    return (
        <div className="flex gap-4 mb-6">
            {images.map((src, index) => (

                <div
                    key={index}
                    className={`w-1/2 border-4  cursor-pointer ${selected === src ? "border-blue-500" : "border-transparent"
                        }`}

                    onClick={() => onSelect(src)}
                >

                    <Image
                        src={src}
                        alt={`img-${index}`}
                        width={300}
                        height={200}
                        unoptimized
                        className="w-full h-auto rounded-3xl"
                    />
                </div>
            ))}
        </div>
    );
}