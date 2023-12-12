'use client';
import { signIn } from 'next-auth/react';
import { useCustomSession } from '../sessions';
import { useEffect, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { data: session, status } = useCustomSession();
  const [preUrl, setPreUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prevPage = sessionStorage.getItem('preUrl') || '/';
      setPreUrl(prevPage);
    }
  }, []);

  const SignIn = () => {
    const credentials = {
      email: email,
      password: password,
    };

    signIn('credentials', { ...credentials, callbackUrl: preUrl });
  };

  if (session && session.user) {
    return <p>이미 로그인했습니다</p>;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center w-4/5 md:w-2/4 xl:w-1/3 md:border h-1/2 py-8">
          <h3 className="text-5xl font-bold">로그인</h3>
          <div className="mt-[60px]">
            <div className="flex justify-between w-full flex-wrap">
              <div className="w-4/5 mx-auto">
                <div className="text-start">
                  <p>이메일</p>
                  <input
                    type="text"
                    className="px-2 border w-full text-[#191919] focus:outline-gray-400 h-[50px] mx-auto"
                    placeholder="example@naver.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="text-start mt-3">
                  <p>비밀번호</p>
                  <input
                    type="password"
                    className="px-2 border h-[50px] text-[#191919] w-full mx-auto focus:outline-gray-400"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="border h-[50px] bg-black font-bold mt-4 w-full mx-auto"
                  onClick={() => {
                    SignIn();
                  }}
                >
                  로그인
                </button>

                <h3 className="text-xl font-bold mt-8 ">SNS 로그인</h3>
                <div className="w-full flex mb-7 justify-between">
                  <button
                    className="basis-1/5 mt-3 py-2 mx-auto border bg-[#F7E100]"
                    onClick={() => signIn('kakao')}
                  >
                    <p>Kakao</p>
                  </button>
                  <button
                    className="basis-1/5 mt-3 py-2 mx-auto text-black border"
                    onClick={() => signIn('google')}
                  >
                    <p>Google</p>
                  </button>
                  <button
                    className="basis-1/5 mt-3 mx-auto py-2 border bg-[#3FC754]"
                    onClick={() => signIn('naver')}
                  >
                    <p>Naver</p>
                  </button>
                  <button
                    className="basis-1/5 mt-3 mx-auto py-2 border bg-[#000]"
                    onClick={() => signIn('github')}
                  >
                    <p>Github</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
