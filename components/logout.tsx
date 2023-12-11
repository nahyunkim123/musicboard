'use client'
import {signIn, signOut} from 'next-auth/react'

export default function LogoutComponent() {
        return(
            <>
              <button onClick={()=>signOut()} className='w-full'>   
                <p>로그아웃</p>
              </button>
            </>
        )
};
