'use client';

export default function LoginComponent() {
  const redirectTo = () => {
    sessionStorage.setItem('preUrl', window.location.href);
    window.location.href = '/login';
  };

  return (
    <>
      <button onClick={redirectTo}>로그인</button>
    </>
  );
}
