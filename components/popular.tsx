import db from '@/db';
import { RowDataPacket } from 'mysql2';
import Link from 'next/link';
import Thumbnail from './thumbnail';

export default async function PopularComponent() {
  const [results] = await db.query<RowDataPacket[]>(
    'SELECT * FROM musicboard.board1 order by count DESC limit 4',
  );

  return (
    <>
      <div className="w-4/5 mx-auto mt-[70px] pl-6">
        <h1 className="text-[40px] font-semibold mt-5">🔥 인기</h1>
        <p>많은 사용자들이 이 플리를 좋아해요!</p>
      </div>
      <div className="w-4/5 p-6 mx-auto gap-x-5 flex-wrap flex mt-3 justify-start">
        {results &&
          results.length > 0 &&
          results.map((e, i) => {
            return (
              <div
                className="mt-[15px] transition border-b py-2 border-[#888] ease-in-out mb-5 basis-full md:basis-[47%] lg:basis-[22%] items-center hover:scale-105 hover:-translate-y-1"
                key={i}
              >
                <Link href={`/post/${e.id}`}>
                  {e.url && <Thumbnail videoId={e.url} />}
                  <p className="py-3 text-xl font-bold">{e.title}</p>
                  <p>{e.username}님의 플리</p>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}
