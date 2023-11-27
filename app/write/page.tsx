'use client'
import Link from 'next/link';
import React,{ useEffect, useState } from 'react';
import { useCustomSession } from '../sessions';
import axios from 'axios';
import Image from 'next/image';


interface formType{
    userid:string;
    nickname:string;
    username:string;
    title:string;
    content:string;
    url:string
}

interface DataType {
    id:{
        videoId:string;
    }
    snippet: {
      title: string;
      thumbnails: Record<'high', { url: string }>;
    };
  }
  


export default function Write(){
    const {data: session} = useCustomSession(); 
    const [formData, setFormData] = useState<formType>(
        {
            userid: session?.user?.email ?? '',
            username: session?.user?.name ?? '',
            nickname:session?.user?.nickname ?? '',
            title:'',
            content:'',
            url:''

        }
    )
       
    const changeEvent = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormData({...formData,[e.target.name] : e.target.value})
       
    }


    const [searchData, setSearchData]= useState<string>('')
    const [resultVideo, setResultVideo] = useState<DataType[]>([])
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchData}&key=${process.env.YOUTUBE_KEY}`
          );
         
          const data = response.data.items;
          setResultVideo(data)
          console.log(data)
       
        } catch (error) {
          console.log(error);
        }
      
      };
      
  



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

            <div className='max-w-7xl text-center mt-[70px]'>
                <div className='w-4/5  mx-auto mt-6'>
                    <div className='flex items-center gap-x-3'>
                        <input type="text" className=" border-black border px-2 w-full h-[60px] focus:outline-none" placeholder={`${session && session.user.name}님의 플레이리스트를 추가해보세요!`} value={searchData} onChange={(e)=>{setSearchData(e.target.value)}}/>
                        <button onClick={()=>fetchData()} className='w-[60px] h-[60px] bg-[#000] text-white'>찾기</button>
                    </div>
                    <div className='mt-3'>
                        {
                            resultVideo&& resultVideo.map((e,i)=>{
                                const decodedTitle = new DOMParser().parseFromString(e.snippet.title, 'text/html').body.textContent;
                                return(
                                    <div key={i} className='w-full flex border-b gap-x-4 items-center'>
                                        <Link href={`https://www.youtube.com/watch?v=${e.id.videoId}`}>
                                        <Image src={e.snippet.thumbnails.high.url} width={130} height={100} alt={e.snippet.title}/>
                                        <div className='basis-3/5'>{decodedTitle}</div></Link>
                                        <button className='basis-1/5'>+</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <form method="post" onSubmit={submitEvent
                } className='w-4/5 p-5 mt-8 mx-auto h-auto'>
              
                      
                    <input className='w-full pb-3 text-xl border-b focus:outline-none' type="text" name="title" defaultValue={formData.title} placeholder='제목' onChange={changeEvent}/>
      
                    <textarea placeholder='내용' className= 'focus:outline-none p-3 w-full h-[300px] mt-4' name="content" defaultValue={formData.content}  onChange={changeEvent}/>
                    
                    
                </form>
                    <div className="w-full flex h-[60px]  bg-[#111] fixed bottom-0">
                        <div className='flex h-[40px] justify-between items-center mx-auto'>
                            <button className="bg-[#FA7070] transition-all text-white px-4 py-2 shadow-md focus:outline-none">
                            <Link href='/'>취소</Link>
                            </button>
                            <button onClick={()=>submitEvent} className=" transition-all text-white px-4 py-2 shadow-md focus:outline-none">업로드</button>
                        </div>
                    </div>
            </div>
        </>
    )
}