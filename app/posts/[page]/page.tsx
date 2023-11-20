
import db from '@/db'
import {RowDataPacket} from 'mysql2/promise'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Search from '@/components/search'



interface userInfo {
  user:{
    name: string;
    email?:string;
    image?: string;
    level?: number;

  }
}

export default async function PostsList({
    params,
} : {params?: {page ?: number}}) {

    console.log(params)

        const currentPage = params?.page !== undefined ? params.page :1;
        const perPage = 16
        const offset = (currentPage-1) * perPage;

       
        const [results]= await db.query<RowDataPacket[]>('select * from musicboard.board1 order by date DESC limit ?  offset ? ',[perPage,offset]);
        const [countResult] = await db.query<RowDataPacket[]>
        ('select count(*) as cnt from musicboard.board1')
        const totalCnt = countResult[0].cnt
        

        const lastPage = Math.ceil(totalCnt / perPage);
        const totalPageCnt = 5;
        const startPage = Math.floor((currentPage - 1) / totalPageCnt) * totalPageCnt + 1;
        const endPage = Math.min(lastPage, startPage + totalPageCnt - 1);
        let prevStart = Math.floor((currentPage -1)/5) *5 -4;
        let nextStart = Math.ceil((currentPage) /5)*5 +1;
        

        let sessions = await getServerSession(authOptions) as userInfo;
       console.log(sessions);

        

  return (
    <>
        <div className="mx-auto max-w-7xl p-6">
                <div className="flex justify-around items-center mb-6 relative">
                    <h1 className="text-[50px] font-semibold mt-5">
                         전체
                    </h1>

                    {sessions && 

                      <Link href="/write" className="bg-[#000] absolute -bottom-[15px] transition-all mt-6 text-white px-4 py-2  right-3">글쓰기</Link>
                    }

                </div>

            </div>
            
            <div className="w-4/5 p-6 mx-auto gap-x-2 flex-wrap flex mt-3 justify-start">
            {
                
                results && results.map((e,i)=>{
                    const date = new Date(e.date);
                    const year=date.getFullYear();
                    const month = (date.getMonth()+1).toString().padStart(2,'0');
                    const day = date.getDate().toString().padStart(2,'0')
                    const formatDate = `${year}-${month}-${day}`
                    const number = totalCnt - ((currentPage - 1)* perPage +i)
                    return(
                        <ul className="mb-5 basis-full md:basis-[49%] lg:basis-[24%] border rounded-lg items-center hover:bg-slate-200" key={i}>
                            <li className="rounded-md border px-3 py-1 bg-[#000] text-white basis-1/14 text-center">{number}</li>
                            <li className="px-6 py-3 basis-8/14 text-center"><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                            <li className="px-6 py-3 basis-2/14 text-center">{e.username}</li>
                            {/* <li className="px-6 py-3 basis-3/14 text-center">{formatDate}</li> */}
                        </ul>
                    )
                })
            }

            </div>
            <div className="flex justify-center gap-x-5 mb-5">
                {
                    currentPage > 5 && <Link href={`/posts/${prevStart}`} className='bg-white border px-2 py-1 text-sm rounded'>이전</Link>
                }
                {
                    Array(endPage - startPage + 1).fill(null).map((_,i)=>{
                        const pageNumber = i + startPage
                        return(
                            <>
                                <Link href={`/posts/${pageNumber}`} className='bg-white border px-2 py-1 text-sm rounded'>{pageNumber}</Link>
                            </>
                        )
                    })
                }
                {
                    nextStart <= lastPage && <Link className='bg-white border px-2 py-1 text-sm rounded' href={`/posts/${nextStart}`}>다음</Link>
                }
            </div>
            <Search/>
    </>
  )
}
