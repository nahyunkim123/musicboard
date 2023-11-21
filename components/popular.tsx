
import db from '@/db'
import { RowDataPacket } from 'mysql2'

export default async function popular() {

     const [results] = await db.query<RowDataPacket[]>('SELECT * FROM board.board1 where id= ? order by count DESC',[])

    return(
        <>

        </>
    )
};
