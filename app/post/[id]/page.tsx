import db from '@/db'
import {RowDataPacket} from 'mysql2'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import Comment from '@/components/comment'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import EditDelete from './editDelete'
import YoutubeVideo from '@/components/youtubevideo'


interface userInfo{
    user:{
        name:string;
        email?:string;
        image?:string;
        level?:number;
        nickname?:string
    }
}
interface propsType{
    results :{
        id:number;
        userid:string;
        title:string;
        content:string;
        username?:string;
        count:number;
        data:string;
        url:string;
    }
}


async function GetIp(){
    
    const res = await fetch('https://musicboard-12-nahyunkim123.vercel.app/api/get-ip');
    const data = res.json();
    if(!res.ok){
        alert("에러가 발생하였습니다")
        return;
    }
    return data
}



export default async function Detail({
    params
}:{
    params ?: {id?:number}
}){

    const getIp = await GetIp();
    const userIp = getIp.data
    const postId = params?.id !== undefined ? params.id : 1;

       
    const [results]= await db.query<RowDataPacket[]>('select * from musicboard.board1 where id = ? ',[postId]);
    const post = results && results[0]

    let session = await getServerSession(authOptions) as userInfo
    const [countResult] = await db.query<RowDataPacket[]>('select count (*) as cnt from musicboard.view_log where postid = ? and ip_address = ?',[postId,userIp])
    const totalCnt = countResult[0].cnt;


    if(results.length > 0){
        
        if(totalCnt === 0){
            await db.query<RowDataPacket[]>('update musicboard.board1 set count = count + 1 where id = ? ',[postId])
        }


        await db.query<RowDataPacket[]>('insert into musicboard.view_log (postid, ip_address, view_date) select ?, ?, NOW() where not exists (select 1 from musicboard.view_log where postid = ? and ip_address = ? and view_date > now() - interval 24 hour)', [postId, userIp, postId, userIp])
    
        
    }

    return(
    <>
        <div className="w-full mt-8">
            {
                results.length > 0 &&
                    <div className="w-4/5 p-7 border rounded-xl mx-auto">           
                        <div className="w-full flex justify-between items-end  pb-3">
                            <div className="text-md"><span className='font-bold'>{post.username}</span>님의 플레이리스트</div>
                            <p className="text-md">조회수 {post.count}</p>               
                        </div>
                        <p className="text-3xl border-b">{post.title}</p> 
                        {
                            post.url &&
                            <div className='mt-5 w-full'>
                                <div className='w-4/5 mx-auto'>
                                    <YoutubeVideo  videoId={post.url}/>
                                </div>
                            </div>
                        }
                        <p className="text-md mt-6 pb-[20px]">{post.content}</p>
                        <div className="mt-10">
                            {
                                session ? <Comment id={post.id}/> 
                                : 
                                <>
                                    <p className="block border p-4 text-center my-5 rounded-md"><Link href="/login">댓글을 작성하려면 로그인해주세요</Link></p>
                                </>
                            }
                            <EditDelete results={post as propsType['results']}/>
                        </div>
                    </div>
            }
        </div>
    </>
    )
}