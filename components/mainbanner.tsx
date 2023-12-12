import Image from 'next/image';
import Mainbanner from '@/public/images/Main.png';

export default function MainBanner() {
  return (
    <div className="w-full h-auto">
      <Image src={Mainbanner} style={{ objectFit: 'cover' }} alt="mainbanner" />
    </div>
  );
}
