
import { NextRequest,NextResponse } from 'next/server'
import db from '@/db'


interface PostData {
    title: string;
    content:string;
    id:string;

}


export const POST = async (
    req: NextRequest
) : Promise<NextResponse> =>{
    
    if(req.method === 'POST'){
        try{
            

            const {title, content, id} : PostData = JSON.parse(await req.text())
          
    
            if( !title || !content|| !id) {
                return NextResponse.json({message:"데이터가 부족합니다."})
            }else{

               
                const [results] = await db.query(
                    'update musicboard.board1 set title = ? , content= ? where id = ?', [title,content,id]
                
                )
                return NextResponse.json({message:"성공", result:results})
            }

            return NextResponse.json({message:"성공"})

        }catch(error){
            return NextResponse.json({error:"에러"})
        }
    }else{
        return NextResponse.json({error:"정상적인 데이터가 아닙니다"})
    }
        
    return NextResponse.json("성공")
}