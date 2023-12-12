'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PostList {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  count: number;
}

interface formType {
  id: string;
  title: string;
  content: string;
}

export default function EditComponent() {
  const params = useParams();
  const [post, setPost] = useState<PostList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/post/${params.id}`);
      const data = await res.json();
      setPost(data.data);
    };
    fetchData();
  }, [params.id]);

  const [formData, setFormData] = useState<formType>({
    id: `${params.id}`,
    title: '',
    content: '',
  });

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData };
      const res = await fetch('/api/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
      if (res.ok) {
        const data = await res.json();
        alert('정상적으로 수정되었습니다');
        window.location.href = '/';
      } else {
        const errorData = await res.json();
        console.log(errorData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-7xl text-center">
        <h3 className="mt-[80px] text-7xl font-bold">글수정</h3>
        <form
          method="post"
          className="w-4/5 p-5 mt-8 mx-auto border h-auto rounded-md"
          onSubmit={submitEvent}
        >
          <div className="flex items-center">
            <h4 className="basis-1/6 text-center">닉네임 </h4>
            <div className="py-2 basis-1/6 text-gray-700 text-sm mb-2 rounded-xl">
              {post && post[0]?.author}
            </div>
          </div>
          <div className="flex items-center">
            <h4 className="basis-1/6 text-center">제목</h4>
            <input
              className="py-2 px-2 basis-5/6 border rounded-xl focus:outline-[#999]"
              defaultValue={post && post[0]?.title}
              type="text"
              name="title"
              onChange={changeEvent}
            />
          </div>
          <textarea
            className="border p-3 w-full h-[600px] mt-4 rounded-xl focus:outline-[#999]"
            name="content"
            defaultValue={post && post[0]?.content}
            onChange={changeEvent}
          />

          <div className="flex justify-between">
            <button className="bg-[#FA7070] transition-all text-white px-4 py-2 rounded-xl shadow-md focus:outline-none">
              <Link href="/">취소</Link>
            </button>
            <button
              className="bg-[#3C486B] transition-all text-white px-4 py-2 rounded-xl shadow-md focus:outline-none"
              onClick={() => submitEvent}
            >
              업로드
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
