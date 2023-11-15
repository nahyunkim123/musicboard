
"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";


interface formType{
    email:string;
    password:string;
    name: string;

}

export default function Register() {

    const[formData, setFormData]= useState<formType>(
        {
            email:"",
            password:"",
            name:''
        }
    )
    const [message,setMessage] = useState<string>("")

    const changeEvent = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
       
    }

    const submitEvent =  async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            try{

                const res = await fetch('/api/auth/signup',{
                    method:'POST',
                    headers :{
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                if(res.ok){
                    const data= await res.json();
                    const result = data.data
                    if(data.message === '성공'){
                        alert("회원가입이 완료되었습니다")
                        signIn('credentials',{
                            email: result.email,
                            password: result.password,
                            callbackUrl:'/'
                        })
                    }
                    setMessage(data.message)
                }
            }catch(error){
                console.log(error)
            }
    }     

    

    return(
        <>
        
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center w-4/5 md:w-2/4 xl:w-1/3 h-1/2 border py-8">
            <form className="max-w-sm p-6 mx-auto space-y-6 border-gray-200" onSubmit={submitEvent}>
            <div className="space-y-2 text-center">
               <p className="text-5xl font-bold">회원가입</p>
               <div className="mt-[60px]">
                <div className="space-y-4">
                        <input type="text" className="px-2 border w-full focus:outline-gray-400 h-[50px] mx-auto" placeholder="@example.com" name="email" required onChange={changeEvent}/>
                </div>
                    <input type="password" className="px-2 border w-full focus:outline-gray-400 h-[50px] mx-auto" placeholder="비밀번호를 입력하세요" name="password" required onChange={changeEvent}/>
                    <input type="password" className="px-2 border w-full focus:outline-gray-400 h-[50px] mx-auto" placeholder="비밀번호 확인" name="password" required onChange={changeEvent}/>
                    <input type="text" className="px-2 border w-full focus:outline-gray-400 h-[50px] mx-auto" placeholder=" 닉네임을 입력하세요" name="name" required onChange={changeEvent}/>
                    <p className="text-[#F94C10]">{message}</p>
                    <button className="w-full h-[50px] bg-[#000] text-white" type="submit">가입하기</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
        </>
    )
};
