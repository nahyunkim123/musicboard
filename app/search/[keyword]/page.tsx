import db from '@/db'
import { RowDataPacket } from 'mysql2'
import React from 'react'
import Link from 'next/dist/client/link'



export default async function SearchResult({
    params
}:{
    params?: {keyword?:string}
} ){
    
    const keywords = params?.keyword !== undefined ? params.keyword : "";
    const DecodeKeyword = decodeURIComponent(keywords)
    const [results] = await db.query<RowDataPacket[]>('select * from musicboard.board1 where title Like ?', [`%${DecodeKeyword}%`])

    return(
        <>
            <p>검색 결과  : {DecodeKeyword}</p>
                {
                results.length === 0 && 
                <p>검색 결과가 없습니다</p> 
                }
                {
                    results && results.length > 0 && results.map((e,i)=>{
                        return(
                            <div className='flex' key={i}>
                                <Link href={`/post/${e.id}`}>
                                    <p>{e.title}</p> 
                                </Link>
                                <p>{e.content}</p>
                                <p>{e.userid}</p>
                               
                            </div>
                        )
                    })
                }
           
        </>
    )
}