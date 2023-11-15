
import db from '@/db'
import { NextRequest,NextResponse } from 'next/server'
import {RowDataPacket} from 'mysql2/promise'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'


interface userInfo {
  user:{
    name: string;
    email?:string;
    image?: string;
    level?: number;

  }
}

export default async function Home() {

        const page = 1
        const perPage = 15
        const offset = (page-1) * perPage;

       
        const [results]= await db.query<RowDataPacket[]>('select * from musicboard.board1 order by date DESC limit ?  offset ? ',[perPage,offset]);
        const [countResult] = await db.query<RowDataPacket[]>
        ('select count(*) as cnt from musicboard.board1')
        const totalCnt = countResult[0].cnt
        

        let sessions = await getServerSession(authOptions) as userInfo;
       console.log(sessions);

        

  return (
    <>
        <div className="mx-auto max-w-7xl p-6">
                <div className="flex justify-around items-center mb-6 relative">
                    <h1 className="text-[80px] font-semibold">
                        게시판
                    </h1>

                    {sessions && 

                      <Link href="/write" className="bg-[#3C486B] absolute -bottom-[15px] transition-all text-white px-4 py-2 rounded-xl shadow-md right-3 hover:bg-[#3F497F]">글쓰기</Link>
                    }

                </div>

            </div>
            <ul className="w-4/5 mx-auto flex justify-between border rounded-xl">
                <li className="px-6 py-3 text-center">번호</li>
                <li className="px-6 py-3 text-center">제목</li>
                <li className="px-6 py-3 text-center">작성자</li>
                <li className="px-6 py-3 text-center">작성일</li>
            </ul>
            <div className="w-4/5 p-6 mx-auto mt-9 border rounded-md">
            {
                
                results && results.map((e,i)=>{
                    const date = new Date(e.date);
                    const year=date.getFullYear();
                    const month = (date.getMonth()+1).toString().padStart(2,'0');
                    const day = date.getDate().toString().padStart(2,'0')
                    const formatDate = `${year}-${month}-${day}`
                    return(
                        <ul className="mb-5 flex justify-between border-b items-center transition-all  hover:bg-slate-200 hover:rounded-md" key={i}>
                            <li className="rounded-md border px-3 py-1 bg-[#3C486B] text-white basis-1/14 text-center">{results.length-i}</li>
                            <li className="px-6 py-3 basis-8/14 text-center"><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                            <li className="px-6 py-3 basis-2/14 text-center">{e.username}</li>
                            <li className="px-6 py-3 basis-3/14 text-center">{formatDate}</li>
                        </ul>
                    )
                })
            }

            </div>
    </>
  )
}
