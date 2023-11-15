'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"


interface PostList{
    id: string;
    title:string;
    content:string;
    userid: string;
    username: string;
    date:string;
    count: number;

}

export default function Post(){

    const [posts, setPosts]= useState<PostList[]>([]);
    const [totalCnt, setTotalCnt]= useState<number>(0);
    const [page, setPage]= useState<number>(1);
    




    const lastPage   = Math.ceil(totalCnt /15)

    const totalPageCnt = 5
    const startPage = Math.floor((page-1)/totalPageCnt)* totalPageCnt +1;
    const endPage = Math.min(lastPage, startPage + totalPageCnt -1)
    
    const nextPage = () =>{
        const nextStart = Math.ceil((page) /5) * 5 + 1
        setPage(nextStart)
    }
    const prevPage = () =>{
        const prevPage = Math.floor((page-1) /5) * 5 -4
        setPage(prevPage)
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            if(!page) return;

                const res = await fetch(`/api/post?page=${page}`)
                const data = await res.json();
                setPosts(data.results)
                setTotalCnt(data.totalCnt)
            }
            fetchData()
    },[page])



    return(
        <>

        <div className="mx-auto max-w-7xl p-6">
                <div className="flex justify-around items-center mb-6 relative">
                    <h1 className="text-[80px] font-semibold">
                        게시판
                    </h1>
                    <Link href="/write" className="bg-[#3C486B] absolute -bottom-[15px] transition-all text-white px-4 py-2 rounded-xl shadow-md right-3 hover:bg-[#3F497F]">글쓰기</Link>

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
                
                posts && posts.map((e,i)=>{
                    const date = new Date(e.date);
                    const year=date.getFullYear();
                    const month = (date.getMonth()+1).toString().padStart(2,'0');
                    const day = date.getDate().toString().padStart(2,'0')
                    const formatDate = `${year}-${month}-${day}`
                    return(
                        <ul className="mb-5 flex justify-between border-b items-center transition-all  hover:bg-slate-200 hover:rounded-md" key={i}>
                            <li className="rounded-md border px-3 py-1 bg-[#3C486B] text-white basis-1/14 text-center">{posts.length-i}</li>
                            <li className="px-6 py-3 basis-8/14 text-center"><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                            <li className="px-6 py-3 basis-2/14 text-center">{e.username}</li>
                            <li className="px-6 py-3 basis-3/14 text-center">{formatDate}</li>
                        </ul>
                    )
                })
            }

            </div>

      
        <div className="flex mb-6 gap-x-5 justify-center mx-auto mt-6 items-center">
            {page > 10 && <button onClick={()=>setPage(1)}>첫 페이지</button>}
             {page > totalPageCnt && <button onClick={()=>prevPage()}>이전</button>}

            {
                    Array(endPage - startPage +1 ).fill(null).map((_,i)=>{
                        const pageNum = i + startPage;
                        return(
                                <button key={i} className={`border px-5 py-1 ${page === pageNum ?'bg-black text-white font-bold': 'bg-white text-black'}`} onClick={()=>setPage(pageNum)}>{pageNum}</button>
                
                        )
                    })
            }
           
      
            {page <= lastPage-totalPageCnt && <button onClick={()=>nextPage()}>다음</button>}
            
            {page > 10 && <button onClick={()=>setPage(lastPage)}>마지막 페이지</button>}
          
        </div>
        </>
    )
}


