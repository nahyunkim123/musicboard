'use client'

import { useCustomSession } from "@/app/sessions"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";




interface CommentProps{
    id:number
}

interface formType{
    parentid:number;
    userid:string;
    username:string;
    content:string;
}

interface CommentType{
    id:number;
    parentid:number; 
    userid:string;
    username:string;
    content:string;
    date:string;


}

export default function Comment(props : CommentProps) {


        const {id} = props;
    
        const {data : session} = useCustomSession();
        
        const [formData, setFormData] = useState<formType>({
            parentid:id,
            userid:session?.user?.email ?? '',
            username:session?.user?.name ?? '',
            content: ''
        })

        useEffect(()=>{
                setFormData({
                    parentid:id,
                    userid:session?.user?.email ?? '',
                    username:session?.user?.name ?? '',
                    content: ''
                })
        },[session?.user.name, session?.user.email,id])

        const[totalComment, setTotalComment]= useState<CommentType[]>();

        
        const commentValue = (e:React.ChangeEvent<HTMLInputElement>)=>{
            setFormData({...formData, [e.target.name] :e.target.value})
        }
        

        const params = useParams();
    


        useEffect(()=>{
            const fetchData = async () =>{
                const res = await fetch(`/api/comment?id=${params.id}`)    
                const data = await res.json();
                setTotalComment(data.result)
            }   
            
            
            fetchData()

        },[params.id])


        
        const cmtSubmit = async () =>{

            try{

                const res = await fetch('/api/comment',{
                    method:"POST",
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify(formData)

                })

                if(res.ok){
                    const data = await res.json();
                    setTotalComment(data.result)
                    alert('댓글등록이 완료되었습니다')
                }


            } catch (error) {
            
                console.error('댓글 작성 도중 오류가 발생하였습니다.', error);
            }
            
        }
    

        return(

            <>
            {
                session && session.user && 
                <>

                     <h3 className="border-b text-xl font-bold">댓글</h3> 
                    
                    {
                    totalComment && 
                      totalComment.map((e,i)=>{

                        const date = new Date(e.date);
                        const year=date.getFullYear();
                        const month = (date.getMonth()+1).toString().padStart(2,'0');
                        const day = date.getDate().toString().padStart(2,'0')
                        const hours = (date.getHours()+9).toString().padStart(2,'0')
                        const minutes = date.getMinutes().toString().padStart(2,'0')
                        const seconds = date.getSeconds().toString().padStart(2,'0')
                        const formatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                        return(
                            <div key={i} className="mt-2">
                               
                                <div className="flex gap-x-3">
                                    <p>{e.username}</p>
                                    <p>{e.content}</p>
                                </div>
                                <p className="text-sm text-[gray]">{formatDate}</p>
                            </div>
                        )
                    })
                        }
                        <input name="content" type="text" className="border rounded-md" placeholder='댓글달기' onChange={commentValue}/>
                        <button onClick={()=>cmtSubmit()} className="bg-black text-white rounded-md">올리기</button>
                    </> 
            }
            </>
        )
};
