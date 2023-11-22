'use client'
import Link from 'next/link';
import React,{ useEffect, useState } from 'react';
import { useCustomSession } from '../sessions';
import axios from "axios";

interface formType{
    userid:string;
    nickname:string;
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
            nickname:session?.user?.nickname ?? '',
            title:'',
            content:''

        }
    )
       
    const changeEvent = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormData({...formData,[e.target.name] : e.target.value})
       
    }

    const [searchData, setSearchData]= useState<string>('')
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchData}key=${process.env.YOUTUBE_KEY}`
          );
          const data = response.data;
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        fetchData();
      }, []);



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

    if(!session?.user){
        return <p>로그인 후 이용해주세요</p>
    }


    return(
        <>

            <div className='max-w-7xl text-center'>
                <h3 className='mt-8 text-7xl font-bold'>글쓰기</h3>
                <form method="post" onSubmit={submitEvent
                } className='w-4/5 p-5 mt-8 mx-auto border h-auto'>
                    {/* <div className='flex items-center'>
                    <h4 className='basis-1/6 text-center'>닉네임</h4>
                        <span>{session && session.user.name}</span>
                    </div> */}
                    <div className='flex items-center'>
                        <h4 className='basis-1/6 text-center'>제목</h4>
                        <input className='py-2 basis-5/6 border focus:outline-[#999]' type="text" name="title" defaultValue={formData.title}  onChange={changeEvent}/>
                    </div>
                    <input type="text" className="bg-[#000] placeholder:text-white text-white w-full h-[60px] mt-4 px-2" placeholder={`${session && session.user.name}님의 플레이리스트를 추가해보세요!`} value={searchData} onChange={(e)=>{setSearchData(e.target.value)}}/>
                 
                    <textarea placeholder='내용을 입력하세요' className='border p-3 w-full h-[600px] mt-4 focus:outline-[#999]' name="content" defaultValue={formData.content}  onChange={changeEvent}/>
                    <div className="flex justify-between">
                    <button className="bg-[#FA7070] transition-all text-white px-4 py-2 shadow-md focus:outline-none">
                        <Link href='/'>취소</Link>
                        </button>
                        <button onClick={()=>submitEvent} className="bg-[#000] transition-all text-white px-4 py-2 shadow-md focus:outline-none">업로드</button>
                    </div>
                </form>
            </div>
        </>
    )
}