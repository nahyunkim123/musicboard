import Link from 'next/link';
import { headers } from 'next/headers';

export default async function NotFound() {
  const headerList = headers();
  const domain = headerList.get('referer');

  return (
    <>
      <div className="w-full h-full ">
        <div className=" mx-auto mt-[150px] text-center w-1/2 h-1/3 border rounded-lg p-[40px]">
          <p className="text-[6em] font-bold mb-0"> 404 </p>
          <p className="text-[3em] mb-3 font-bold">NOT FOUND</p>
          <p>입력하신 {domain}을 찾을 수 없습니다</p>
          <button className="w-4/5 mx-auto text-white bg-black py-2 border mt-7">
            <Link href="/">메인으로</Link>
          </button>
        </div>
      </div>
    </>
  );
}
