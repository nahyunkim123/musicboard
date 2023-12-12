'use client';

import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
  const [keyword, setKeyword] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  /*
        useRef = 해당 요소에 접근하기 위해 / 해당 요소의 값의 참조를 저장하기 위해 사용하며, useRef 는 current 속성을 가진 객체를 반환
        useRef 특징 - 참조값이 변경돼도 컴포넌트가 재랜더링 되지 않는다
    */
  const searchSubmit = () => {
    if (keyword === '' || null) {
      inputRef.current?.focus();
      alert('검색어를 입력해주세요');
      return;
    } else {
      window.location.href = `/search/${keyword}`;
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchSubmit();
    }
  };

  return (
    <>
      <div className="relative flex items-center">
        <input
          type="text"
          ref={inputRef}
          placeholder="검색어를 입력해주세요"
          onChange={searchValue}
          onKeyDown={handleKeyDown}
          className="border px-6 py-2 rounded-2xl bg-[#1A1A1A]"
        />
        <button
          onClick={searchSubmit}
          className="bg-[#1A1A1A] text-[#636363] px-3 py-1 right-1 rounded-full absolute "
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </>
  );
}
