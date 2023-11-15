'use client'

import EditComponent from '@/components/edit';
// import db from '@/db';
// import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PostList{
    id: string;
    title:string;
    content:string;
    author: string;
    date:string;
    count: number;

}


interface editProps{
    params: {
        id:string;

    }
}


export default function Edit(props:editProps){
    
    
  
    // const [results] = await db.query<RowDataPacket[]>('SELECT * FROM board.board1 where id= ?',[props.params.id])

    const params = useParams()
    const [post, setPost] = useState<PostList[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(()=>{
        const fetchData = async() =>{
            const res = await fetch(`/api/post/${params.id}`)
            const data = await res.json()
            setPost(data.data)
            setIsLoading(false)
        }       
        fetchData()               
    },[params.id])




    return(
        <>
           {/* {
            results.length > 0 
            ?  */}
            {/* <EditComponent post={post}/> */}
        {/* //     : 
        //     <NotData/>
            
        //    }  */}
        
        <EditComponent />

        </>
    )
}

function NotData(){
    return(
        <>
        <div className="w-full">  
            <p className="text-center mt-7">데이터가 존재하지 않습니다</p>
            <Link className='mx-auto px-2 py-1 border rounded-md' href="/">목록</Link>
        </div>
        </>
    )
}