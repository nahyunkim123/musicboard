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
        const [isActive, setIsActive] = useState<boolean>(false)

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

        

        const deleteComment =  async (e:number) =>{
            try{
                const res= await fetch('/api/deletecomment',{
                    method: 'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify({id: e})
                })
                if(res.ok){
                    const data = await res.json()
                    alert('정상적으로 삭제되었습니다')
                    location.reload();
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
                                    {/* {
                                    isActive ?
                                  
                                        <EditComment setIsActive={setIsActive} content={e.content}/>
                                    
                                    : */}
                                    <div className="flex gap-x-4">
                                        <p>{e.username}</p>
                                        <p>{e.content}</p>
                                        {/* <button className="border w-[40px] rounded-md" onClick={()=>{setIsActive(true)}}>수정</button>
                                        <button onClick={()=>deleteComment(e.id)} className="border w-[40px] rounded-md">삭제</button> */}
                                    </div>
                                    
                                </div>
                                <p className="text-sm text-[gray]">{formatDate}</p>
                            </div>
                        )
                    })
                        }
                        <div className="w-full flex justify-between mt-2">
                            <input name="content" type="text" className="border rounded-md basis-5/6" placeholder='댓글달기' onChange={commentValue}/>
                            <div className="basis-1/6">
                                <button onClick={()=>cmtSubmit()} className="bg-black text-white rounded-md w-[60px]">올리기</button> 
                            </div>
                        </div>
                    </> 
            }
            </>
        )
};
