
import db from '@/db'
import { RowDataPacket } from 'mysql2'
import Link from 'next/link'

export default async function PopularComponent() {

     const [results] = await db.query<RowDataPacket[]>('SELECT * FROM musicboard.board1 order by count DESC limit 4')

    return(
        <>
            <h1 className="text-[50px] text-center font-semibold mt-5">
            🔥 인기
            </h1>
            <div className="w-4/5 p-6 mx-auto gap-x-2 flex-wrap flex mt-3 justify-start">
             {
                    results && results.length > 0 && results.map((e,i)=>{
                        return(
                            <ul className="mb-5 basis-full md:basis-[49%] lg:basis-[24%] border rounded-lg items-center hover:bg-slate-200" key={i}>
                          
                            <li className="px-6 py-3 basis-8/14 text-center"><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                            <li className="px-6 py-3 basis-2/14 text-center">{e.username}</li>
                            {/* <li className="px-6 py-3 basis-3/14 text-center">{formatDate}</li> */}
                        </ul>
                        )
                    })
                }
           </div>
        </>
    )
};
