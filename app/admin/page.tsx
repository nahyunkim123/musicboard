import NewMember from '@/components/admin/chart/newmember';
import NewPost from '@/components/admin/chart/newpost';
import TotalCount from '@/components/admin/chart/totalcnt';

export default async function Admin() {
  return (
    <>
      <TotalCount />
      <div className="w-full my-5 flex flex-wrap justify-between">
        <NewMember />
        <NewPost />
      </div>
    </>
  );
}
