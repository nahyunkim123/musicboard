import Image from 'next/image';
import Mainbanner from '@/public/images/Main.webp';

export default function MainBanner() {
  return (
    <div className="w-full h-auto">
      <Image
        src={Mainbanner}
        width={0}
        height={0}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        alt="mainbanner"
        priority
      />
    </div>
  );
}
