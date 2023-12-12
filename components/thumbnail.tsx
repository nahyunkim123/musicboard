import Image from 'next/image';

export default async function Thumbnail({ videoId }: { videoId: string }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="w-full mx-auto">
      <Image
        src={thumbnailUrl}
        alt="YouTube Thumbnail"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
    </div>
  );
}
