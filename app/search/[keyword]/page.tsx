import db from '@/db';
import { RowDataPacket } from 'mysql2';
import React from 'react';
import Link from 'next/dist/client/link';

export default async function SearchResult({ params }: { params?: { keyword?: string } }) {
  const keywords = params?.keyword !== undefined ? params.keyword : '';
  const DecodeKeyword = decodeURIComponent(keywords);
  const [results] = await db.query<RowDataPacket[]>(
    'select * from musicboard.board1 where title Like ?',
    [`%${DecodeKeyword}%`],
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 mt-[60px]">
        <div className="flex items-end">
          {' '}
          <p className="text-xl px-1 font-bold text-[#F05941]">{DecodeKeyword}</p>(으)로 검색한
          결과, 총 <p className="text-xl px-1 text-[#F05941]">{results.length}</p>개의 게시물이
          있습니다
        </div>
        {results.length === 0 && <p>검색 결과가 없습니다</p>}
        {results &&
          results.length > 0 &&
          results.map((e, i) => {
            const date = new Date(e.date);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const formatDate = `${year}-${month}-${day}`;

            return (
              <div className="flex mt-5 items-end gap-x-4 border-b py-4" key={i}>
                <Link href={`/post/${e.id}`}>
                  <p className="font-bold">{e.title}</p>
                </Link>
                <p>{e.username}</p>
                <p className="text-sm text-[#777]">{formatDate}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
