import Image from "next/image"
import Logo from "@/public/images/logo.png"
import LoginComponent from "./login"

export default function nav() {
   return(
    <>
        <div className="flex justify-between h-[60px] px-4 md:px-8 items-center">
            <Image className="w-[180px] object-contain h-[40px]" src={Logo} width={200} height={30} alt="logo"/>
            <div className="w-[150px]">
                <LoginComponent/>
            </div>
        </div>
    </>
   ) 
};
