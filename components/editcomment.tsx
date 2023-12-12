'use client';

import { useCustomSession } from '@/app/sessions';
import { useState } from 'react';

interface formType {
  userid: string;
  username: string;
  content: string;
}

interface CommentType {
  id: number;
  parentid: number;
  userid: string;
  username: string;
  content: string;
  date: string;
}
interface PropsType {}

export default function EditComment() {
  // const changeEvent = (e:React.ChangeEvent<HTMLInputElement>)=>{
  //     setFormData({
  //         ...formData, [e.target.name] : e.target.value
  //     })

  // }

  // const cmtUpdate = async () =>{

  //     try{

  //         const res = await fetch('/api/editcomment',{
  //             method:"POST",
  //             headers: {
  //                 'Content-Type' : 'application/json'
  //             },
  //             body:JSON.stringify(formData)

  //         })

  //         if(res.ok){
  //             const data = await res.json();
  //             setFormData(data.result)
  //             alert('댓글수정이 완료되었습니다')
  //         }

  //     } catch (error) {

  //         console.error('댓글 작성 도중 오류가 발생하였습니다.', error);
  //     }

  // }
  return (
    <>
      {/* <input type="text" onChange={changeEvent} className="border" defaultValue={content}/>
            <button onClick={()=>setIsActive(false)} className="border w-[40px] rounded-md">취소</button>
            <button className="border w-[40px] rounded-md" onClick={()=>{cmtUpdate()}}>수정</button> */}
    </>
  );
}
