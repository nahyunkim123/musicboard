import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminNav from '@/components/admin/navbar/adminnav';
import { getServerSession } from 'next-auth';

interface userInfo {
  user: {
    name: string;
    email?: string;
    image?: string;
    level?: number;
  };
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let sessions = (await getServerSession(authOptions)) as userInfo;
  if ((!sessions && sessions) || sessions?.user.level !== 10) {
    return (
      <>
        <div className="min-h-[calc(100vh-88px)] flex items-center justify-center flex-wrap">
          <div className="widget p-4 text-center">
            <h3 className="mb-4 text-lg font-semibold">관리자만 접속 가능한 페이지입니다</h3>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between px-[4%] md:px-[2%]">
        <AdminNav />
        <div className="md:pl-48 pt-8 w-full">{children}</div>
      </div>
    </>
  );
}
