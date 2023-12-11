import MemberDelete from "@/components/admin/member/delete";
import Link from "next/link";

interface memberInfo{
    id:number;
    email:string;
    password:string;
    name:string;
    level:number;
    date:string;    
}


async function getData(){
    const res = await fetch('http://localhost:3000/api/admin',{
        cache: 'no-cache',
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            pathUrl:'member'
        })
    })

    const data = res.json();
    if(!res.ok){
        console.log("에러가 발생하였습니다");
        return
    }
    return data;
}

export default async function AmdinMember(){
    const resultdata = await getData();
    const data = resultdata.data;
    
    return(
        <>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <h3>회원관리</h3>
            </div>
            <div className="widget w-full overflow-hidden">
                   {
                    data && data.map((e:memberInfo,i:number)=>{
                        const date  = new Date(e.date);
                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2,'0');
                        const day = date.getDate().toString().padStart(2,'0');
                        const formateDate = `${year}-${month}-${day}`
                        return(
                            <ul className="flex border-b last:border-0 justify-between text-center py-2 text-xs sm:text-sm md:text-base" key={i}>
                                <li className="hidden md:list-item basis-1/12">{data.length - i}</li>
                                <li className="basis-4/12 md:basis-2/12">{e.email}</li>
                                <li className="basis-4/12 md:basis-2/12">{e.name}</li>
                                <li className="basis-1/12">{e.level}</li>
                                <li className="hidden md:list-item basis-3/12">{formateDate}</li>
                                <li className="basis-2/12"><Link href={`/admin/member/edit/${e.id}`}>수정</Link>/<MemberDelete name={e.name} id={e.id}/></li>
                            </ul>
                         )
                    })
                   }
                
            </div>
        </>
    )
}