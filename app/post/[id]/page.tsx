'use client'
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import Loading from "@/components/loading"
import Link from "next/link"
import { useCustomSession } from "@/app/sessions"
import Comment from "@/components/comment"


interface PostList{
    id: number;
    title:string;
    content:string;
    userid: string;
    username: string;
    date:string;
    count: number;

}

export default function Detail(){
    const params = useParams()
    const [post, setPost] = useState<PostList[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {data : session} = useCustomSession();
    

    useEffect(()=>{
        const fetchData = async() =>{

            const res = await fetch(`/api/post/${params.id}`)
            const data = await res.json()
            setPost(data.data)
            setIsLoading(false)
        }       
        fetchData()               
    },[params.id])

    const deletePost =  async (e:number) =>{
        try{
            const res= await fetch('/api/delete',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({id: e})
            })
            if(res.ok){
                const data = await res.json()
                alert('정상적으로 삭제되었습니다')
                window.location.href ='/'
            }else{
                const errorData = await res.json()
                console.log(errorData.error);
            }

        }catch(error){
            console.log(error);
        }
    }

    


    return(
    <>
        {
            isLoading && <Loading/>
        }
        <div className="w-full mt-8">
         {
            post.length > 0 &&
             
                <div className="w-4/5 p-7 border rounded-xl mx-auto">
                    <div className="w-full flex justify-between items-end border-b pb-3">

                    <p className="text-3xl">{post && post[0]?.title}</p>
                    <p className="text-md">{post && post[0]?.username}</p>
                    <p className="text-md">조회수 : {post && post[0]?.count}</p>
                    
                    </div>
                    <p className="text-md mt-6 pb-[20px]">{post && post[0]?.content}</p>

                    <div className="mt-3">

                        
                        {
                            session ? <Comment id={post && post[0]?.id}/> 
                            : <><p className="block border p-4 text-center my-5 rounded-md"><Link href="/login">댓글을 작성하려면 로그인해주세요</Link></p>
                            </>
                        }
                    </div>



                    {
                        session && session.user && (
                            (post && post[0] && session.user.email === post[0].userid)
                        ) && 
                        
                        <>
                        
                            <div className="w-full mt-7 flex justify-between items-end pb-3">
                                <button className="py-2 px-3 border rounded-md"><Link href={`/edit/${post[0]?.id}`}>수정</Link></button>
                                <button className="py-2 px-3 border rounded-md bg-red-400 text-white" onClick={()=>deletePost(post[0]?.id)}>삭제</button>
                            </div>
                        
                        </>
                    }
                </div>
            }


            </div>
    </>
    )
}