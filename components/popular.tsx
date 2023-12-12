import db from '@/db';
import { RowDataPacket } from 'mysql2';
import Link from 'next/link';

export default async function PopularComponent() {
  const [results] = await db.query<RowDataPacket[]>(
    'SELECT * FROM musicboard.board1 order by count DESC limit 4',
  );

  return (
    <>
      <h1 className="text-[40px] text-center font-semibold mt-5">🔥 인기</h1>
      <div className="w-4/5 p-6 mx-auto gap-x-5 flex-wrap flex mt-3 justify-start">
        {results &&
          results.length > 0 &&
          results.map((e, i) => {
            return (
              <ul
                className="mb-5 basis-full border-b border-[#888] md:basis-[45%] lg:basis-[22%] transition ease-in-out items-center hover:scale-105 hover:-translate-y-1"
                key={i}
              >
                <li className="px-6 py-3 text-xl">
                  <Link href={`/post/${e.id}`}>{e.title}</Link>
                </li>
                <li className="px-6 py-3">{e.username}</li>
              </ul>
            );
          })}
      </div>
    </>
  );
}
