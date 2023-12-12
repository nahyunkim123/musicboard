import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

interface PostNumber {
  id: number;
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  if (req.method === 'POST') {
    try {
      const { id }: PostNumber = JSON.parse(await req.text());

      if (!id) {
        return NextResponse.json({ message: '데이터가 부족합니다.' });
      } else {
        await db.query('delete from musicboard.comment where id = ?', [id]);
        return NextResponse.json({ message: '정상적으로 삭제되었습니다' });
      }
    } catch (error) {
      return NextResponse.json({ error: '에러' });
    }
  }

  return NextResponse.json('성공');
};
