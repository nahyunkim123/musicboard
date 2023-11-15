'use client'
import Link from 'next/link';
import React,{ useState } from 'react';
import { useCustomSession } from '../sessions';

interface formType{
    userid:string;
    username:string;
    title:string;
    content:string;
}




export default function Write(){
    const {data: session} = useCustomSession(); 
    const [formData, setFormData] = useState<formType>(
        {
            userid: session?.user?.email ?? '',
            username: session?.user?.name ?? '',
            title:'',
            content:''

        }
    )
        console.log(formData);
    const changeEvent = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormData({...formData,[e.target.name] : e.target.value})
       
    }

    const submitEvent = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const res= await fetch('api/write',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json()
                alert('정상적으로 등록하였습니다')
                window.location.href ='/'
            }else{
                const errorData = await res.json()
                console.log(errorData.error);
            }

        }catch(error){
            console.log(error);
        }
    }

    if(!session){
        return <p>로그인 후 이용해주세요</p>
    }

    return(
        <>

            <div className='max-w-7xl text-center'>
                <h3 className='mt-8 text-7xl font-bold'>글쓰기</h3>
                <form method="post" onSubmit={submitEvent
                } className='w-4/5 p-5 mt-8 mx-auto border h-auto rounded-md'>
                    <div className='flex items-center'>
                    <h4 className='basis-1/6 text-center'>닉네임</h4>
                        <input onChange={changeEvent} className='py-2 basis-5/6 border text-gray-700 text-sm mb-2 rounded-xl focus:outline-[#999]' type="text" name="name" value={session && session.user.name}/>
                    </div>
                    <div className='flex items-center'>
                        <h4 className='basis-1/6 text-center'>제목</h4>
                        <input className='py-2 basis-5/6 border rounded-xl focus:outline-[#999]' type="text" name="title" defaultValue={formData.title}  onChange={changeEvent}/>
                    </div>
                    <textarea className='border p-3 w-full h-[600px] mt-4 rounded-xl focus:outline-[#999]' name="content" defaultValue={formData.content}  onChange={changeEvent}/>

                    <div className="flex justify-between">
                    <button className="bg-[#FA7070] transition-all text-white px-4 py-2 rounded-xl shadow-md focus:outline-none">
                        <Link href='/'>취소</Link>
                        </button>
                        <button onClick={()=>submitEvent} className="bg-[#3C486B] transition-all text-white px-4 py-2 rounded-xl shadow-md focus:outline-none">업로드</button>
                    </div>
                </form>
            </div>
        </>
    )
}