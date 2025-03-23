import Image from 'next/image';

export default function BrandDisplay({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string | null;
}) {
  return imageUrl ? (
    <figure className="">
      <Image src={imageUrl} alt={`${name} logo`} width={50} height={20} />
    </figure>
  ) : (
    <p className="text-sm text-center text-gray-600 text-wrap truncate max-w-[100px]">{name}</p>
  );
}
