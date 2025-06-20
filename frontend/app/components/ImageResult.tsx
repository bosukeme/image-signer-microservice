import Image from "next/image";


interface Props {
  src: string;
}

export default function ImageResult({ src }: Props) {
  return (
    <div className="text-center">
      <Image 
        src={src}
        alt="Processed"
        className="mx-auto rounded-2xl"
        width={500}
        height={500}

      />  

      <a
        href={src}
        download
        className="mt-2 inline-block bg-blue-600 text-white py-1 px-3 rounded"
      >
        Download
      </a>
    </div>
  );
}
