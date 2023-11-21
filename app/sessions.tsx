import { useSession } from "next-auth/react";

interface userInfo{
    user:{
        name: string;
        email:string;
        image?:string;
        level ?:number;
        nickname ?:string;
        
    }
}

interface csSession{
    data:userInfo | null;
    status: "loading" |"authenticated"|"unauthenticated"
}
export function useCustomSession():csSession{
    const {data, status} = useSession();
    return {data:data as userInfo, status}
}