import Image from "next/image"
import Logo from "@/public/images/logo.png"
import LoginComponent from "./login"
import Link from "next/dist/client/link"

export default function nav() {
   return(
    <>
        <div className="flex justify-between h-[60px] px-4 md:px-8 items-center">
            <Link href="/"><Image className="w-[180px] object-contain h-[40px]" src={Logo} width={200} height={30} alt="logo"/></Link>
            <div className="w-[200px]">
                <LoginComponent/>
            </div>
        </div>
    </>
   ) 
};
