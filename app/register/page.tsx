'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface formType {
  email: string;
  password: string;
  name: string;
  nickname?: string;
  gender?: string;
  birthday?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<formType>({
    email: '',
    password: '',
    name: '',
    nickname: '',
    gender: '',
    birthday: '',
  });
  const [message, setMessage] = useState<string>('');
  const [pwChk, setPwChk] = useState<string>('');

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const errMsg = {
    id: {
      invalid: '6~20자의 영문 소문자와 숫자만 사용 가능합니다',
      success: '사용 가능한 아이디입니다',
      fail: '사용할 수 없는 아이디입니다',
    },
    pw: '비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다',
    pwRe: {
      success: '비밀번호가 일치합니다',
      fail: '비밀번호가 일치하지 않습니다',
    },
    birth: '생년월일을 다시 확인해주세요',
  };

  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //이메일 유효성 체크
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      setMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    //비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setMessage('비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }
    //비밀번호 확인
    if (formData.password !== pwChk) {
      setMessage('비밀번호가 동일하지 않습니다');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        const result = data.data;
        if (data.message === '성공') {
          alert('회원가입이 완료되었습니다');
          signIn('credentials', {
            email: result.email,
            password: result.password,
            callbackUrl: '/',
          });
        }
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-4/5 md:w-[600px] h-1/2 border mt-8 py-8">
          <form className="max-w-md p-6 mx-auto space-y-6 border-black" onSubmit={submitEvent}>
            <div className="space-y-2">
              <p className="text-5xl font-bold text-center">회원가입</p>
              <p className="text-sm text-end">
                <span className="text-[#F6635C]">*</span>필수입력사항
              </p>
              <div className="mt-[60px]">
                <div className="space-y-2 mt-8">
                  <p>
                    이메일<span className="text-[#F6635C]">*</span>
                  </p>
                  <input
                    type="text"
                    className="px-2 mt-0 border w-full text-black focus:outline-gray-400 h-[50px] mx-auto"
                    placeholder="music@example.com"
                    name="email"
                    required
                    onChange={changeEvent}
                  />
                </div>
                <p className="mt-5">
                  비밀번호 <span className="text-[#F6635C]">*</span>
                </p>
                <input
                  type="password"
                  className=" mt-3 px-2 border text-black w-full focus:outline-gray-400 h-[50px] mx-auto"
                  placeholder="비밀번호를 입력해주세요"
                  name="password"
                  required
                  onChange={changeEvent}
                />
                <p className="text-[#F94C10]">{message}</p>
                <p className="mt-5">
                  비밀번호 확인<span className="text-[#F6635C]">*</span>
                </p>
                <input
                  type="password"
                  className="mt-3 px-2 border w-full text-black focus:outline-gray-400 h-[50px] mx-auto"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  name="passwordchk"
                  value={pwChk}
                  onChange={(e) => setPwChk(e.target.value)}
                  required
                />
                <p className="text-[#F94C10]">{message}</p>
                <p className="mt-5">
                  이름 <span className="text-[#F6635C]">*</span>
                </p>
                <input
                  type="text"
                  className="mt-3 px-2 border w-full text-black focus:outline-gray-400 h-[50px] mx-auto"
                  placeholder="이름을 입력해주세요"
                  name="name"
                  required
                  onChange={changeEvent}
                />
                <p className="mt-5">닉네임</p>
                <input
                  type="text"
                  className="text-black mt-3 px-2 border w-full focus:outline-gray-400 h-[50px] mx-auto"
                  placeholder=" 닉네임을 입력해주세요"
                  name="nickname"
                  required
                  onChange={changeEvent}
                />
                <p className="mt-5">성별</p>
                <div className="flex mt-3 justify-around">
                  <label>
                    <input
                      className="active:bg-[#000]"
                      type="radio"
                      name="gender"
                      value="M"
                      onChange={changeEvent}
                      checked={formData.gender === 'M'}
                    />{' '}
                    남성
                  </label>
                  <label>
                    <input
                      type="radio"
                      onChange={changeEvent}
                      name="gender"
                      value="F"
                      checked={formData.gender === 'F'}
                    />{' '}
                    여성
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      onChange={changeEvent}
                      value="N"
                      checked={formData.gender === 'N'}
                    />{' '}
                    선택 안 함
                  </label>
                </div>
                <button className="w-full h-[50px] mt-8 bg-[#000] text-white" type="submit">
                  가입하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
