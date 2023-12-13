// import ChartCom from '@/components/admin/chart/chart';
import dynamic from 'next/dynamic';
const ChartCom = dynamic(() => import('@/components/admin/chart/chart'));

export default function AdminVisit() {
  return <ChartCom />;
}
