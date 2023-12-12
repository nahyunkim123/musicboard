import MainBanner from '@/components/mainbanner';
import PostsList from './posts/[page]/page';

export default async function Home() {
  return (
    <>
      <MainBanner />
      <PostsList />
    </>
  );
}
