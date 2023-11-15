
import { getServerSession } from "next-auth";
import LogoutComponent from './logout';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from "next/dist/client/link";

interface userInfo {
    user:{
      name: string;
      email?:string;
      image?: string;
      level?: number;
  
    }
  }


export default async function LoginComponent() {

    let session = await getServerSession(authOptions) as userInfo
    
    
    const redirectTo = () =>{
        sessionStorage.setItem('preUrl', window.location.href);
        window.location.href= "/login"
    }

   
    return(
        <>
   
            

        {
               session && session.user.name ? 
                    <div className="flex justify-center">
                        <p className="w-full">{session && session.user?.name}님</p>
                        <LogoutComponent/>
                    </div>
                :
                 <>
                    <button className="p-1"><Link href="/login">로그인</Link></button>
                </>   
            
            }

         
        </>
    )
}
