import Image from 'next/image';
import LoginComponent from './login';
import Link from 'next/dist/client/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutComponent from './logout';
import Search from './search';

interface userInfo {
  user: {
    name: string;
    email?: string;
    image?: string;
    level?: number;
  };
}

export default async function nav() {
  let session = (await getServerSession(authOptions)) as userInfo;

  return (
    <>
      <div className="flex justify-between h-[60px] px-4 md:px-8 items-center">
        <Link href="/">
          <div className="flex w-[130px] justify-between items-center">
            <div className="w-[30px] h-[30px] bg-slate-50"></div>
            <p className="relative logo">Music Board</p>
          </div>
        </Link>
        <div className="basis-1/3">
          <div className=" flex gap-x-3 justify-center items-center">
            <div className="hidden md:block">
              <Search />
            </div>
            {session && session.user.name ? (
              <>
                <p className=" ml-3 w-full">{session && session.user?.name}님</p>
                <LogoutComponent />
              </>
            ) : (
              <>
                <LoginComponent />
                <button className="px-3">
                  <Link href="/register">회원가입</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
