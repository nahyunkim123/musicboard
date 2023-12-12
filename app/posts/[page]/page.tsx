import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PopularComponent from '@/components/popular';
import Thumbnail from '@/components/thumbnail';

interface userInfo {
  user: {
    name: string;
    email?: string;
    level?: number;
  };
}

interface PropType {
  params?: {
    page: number;
  };
}

export default async function PostsList({ params }: PropType) {
  const currentPage = params?.page !== undefined ? params.page : 1;
  const perPage = 16;
  const offset = (currentPage - 1) * perPage;

  const [results] = await db.query<RowDataPacket[]>(
    'select * from musicboard.board1 order by date DESC limit ?  offset ? ',
    [perPage, offset],
  );
  const [countResult] = await db.query<RowDataPacket[]>(
    'select count(*) as cnt from musicboard.board1',
  );
  const totalCnt = countResult[0].cnt;

  const lastPage = Math.ceil(totalCnt / perPage);
  const totalPageCnt = 5;
  const startPage = Math.floor((currentPage - 1) / totalPageCnt) * totalPageCnt + 1;
  const endPage = Math.min(lastPage, startPage + totalPageCnt - 1);
  let prevStart = Math.floor((currentPage - 1) / 5) * 5 - 4;
  let nextStart = Math.ceil(currentPage / 5) * 5 + 1;
  let sessions = (await getServerSession(authOptions)) as userInfo;

  return (
    <>
      <div className="mx-auto max-w-7xl p-6">
        <PopularComponent />
        <div className="flex justify-around items-center mb-6 relative">
          <h1 className="text-[40px] font-semibold mt-5">전체</h1>

          {sessions && (
            <Link
              href="/write"
              className="bg-[#000] absolute -bottom-[15px] transition-all mt-6 text-white px-4 py-2  right-3"
            >
              글쓰기
            </Link>
          )}
        </div>
      </div>

      <div className="w-4/5 p-6 mx-auto gap-x-5 flex-wrap flex mt-3 justify-start">
        {results &&
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
      <div className="flex justify-center gap-x-5 mb-5">
        {currentPage > 5 && (
          <Link href={`/posts/${prevStart}`} className="border px-2 py-1 text-sm rounded">
            이전
          </Link>
        )}
        {Array(endPage - startPage + 1)
          .fill(null)
          .map((_, i) => {
            const pageNumber = i + startPage;
            return (
              <>
                <Link href={`/posts/${pageNumber}`} className="border px-2 py-1 text-sm">
                  {pageNumber}
                </Link>
              </>
            );
          })}
        {nextStart <= lastPage && (
          <Link className="bg-white border px-2 py-1 text-sm rounded" href={`/posts/${nextStart}`}>
            다음
          </Link>
        )}
      </div>
    </>
  );
}
