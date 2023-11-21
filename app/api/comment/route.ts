
import { NextRequest,NextResponse } from 'next/server'
import db from '@/db'
import { RowDataPacket } from 'mysql2';


interface PostData {
    parentid: number;
    userid:string;
    username:string;
    content:string;

}


export const POST = async (
    req: NextRequest
) : Promise<NextResponse> =>{

    if(req.method === 'POST'){
        try{
            

            const {userid, username, parentid, content} : PostData = JSON.parse(await req.text())

            if(!username || !username || !parentid || !content){
                return NextResponse.json({message:"데이터가 부족합니다."})
            }else{

               
                const [results] = await db.query<RowDataPacket[]>(
                    'insert into musicboard.comment ( userid, username, parentid, content) values(?,?,?,?)',[userid, username,parentid, content]
                  
                )
                const [datas] = await db.query<RowDataPacket[]>('select * from musicboard.comment where parentid = ?',[parentid])
                return NextResponse.json({message:"성공", result:datas})
            }

        

        }catch(error){
            return NextResponse.json({error:"에러"})
        }
    }else{
        return NextResponse.json({error:"정상적인 데이터가 아닙니다"})
    }
        
   
}


export const GET = async(
    req:NextRequest
)  : Promise<NextResponse> =>{

    if(req.method ==='GET'){

        try{

            const parentid = req.nextUrl.searchParams.get("id");
           
            const[results] = await db.query<RowDataPacket[]>('select * from musicboard.comment where parentid = ? order by date DESC',[parentid])


            return NextResponse.json({message:"성공", result:results}) 


        }catch(error){

            return NextResponse.json({error:error})
        }

       
    }else{
        return NextResponse.json({error:"정상적인 데이터가 아닙니다"}) 
    }
}
