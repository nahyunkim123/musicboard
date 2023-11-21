'use client'
import { useCustomSession } from "@/app/sessions";
import Link from "next/link";


interface userInfo{
    user:{
        name:string;
        email?:string;
        image?:string;
        level?:number;
    }
}
interface propsType{
    results :{
        id:number;
        userid:string;
        title?:string;
        content?:string;
        username?:string;
        count?:number;
        data?:string;


    }
}


export default function EditDelete({results}: propsType) {


    const {data: session} = useCustomSession();

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
                session && session.user && (
                    (results && results && session.user.email === results.userid)
                ) && 
                
                <>
                
                    <div className="w-full mt-7 flex justify-between items-end pb-3">
                        <button className="py-2 px-3 border rounded-md"><Link href={`/edit/${results?.id}`}>수정</Link></button>
                        <button className="py-2 px-3 border rounded-md bg-red-400 text-white" onClick={()=>deletePost(results?.id)}>삭제</button>
                    </div>
                
                </>
            }
        </>
   ) 
};
