import Image from "next/image"
import Logo from "@/public/images/logo.png"
import LoginComponent from "./login"
import Link from "next/dist/client/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import LogoutComponent from "./logout"

interface userInfo {
    user:{
      name: string;
      email?:string;
      image?: string;
      level?: number;
     
  
    }
  }



export default async function nav() {

    let session = await getServerSession(authOptions) as userInfo
    
   return(
    <>
        <div className="flex justify-between h-[60px] px-4 md:px-8 items-center">
            <Link href="/"><Image className="w-[180px] object-contain h-[40px]" src={Logo} width={200} height={30} alt="logo"/></Link>
            <div className="w-[200px]">
            {
               session && session.user.name ? 
                    <div className=" flex justify-between">
                        <p className="w-full">{session && session.user?.name}님</p>
                        <LogoutComponent/>
                    </div>
                :
                 <>
                    <LoginComponent/>
                    <button className="px-3"><Link href="/register">회원가입</Link></button>
                </>   
            
            }

            </div>
        </div>
    </>
   ) 
};
