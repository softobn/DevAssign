
import { AiOutlineProject } from "react-icons/ai";
import { MdDeveloperBoard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div className="flex flex-col md:flex-row gap-[20px]">

            
         
            <div className="bg-blue-500 md:w-[220px] lg:w-[250px]  md:h-[1000px] ">

           <div className="flex pt-[20px]">
            <img className="h-[50px] w-[50px]" src="https://i.ibb.co/288YtK5/1245850.png" alt="" />
           <h1 className="text-center text-[28px] text-white font-bold">Dev<span className="text-blue-900">Assign</span></h1>

           </div>

    <div className="relative top-[40px] ">
        <img className="h-[100px] w-[100px] rounded-[50%] mx-auto" src="https://i.ibb.co/Hrzhnr8/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg" alt="" />
    </div>

               <Link to={'/dashboard'}>
               <div className="focus:border-l-[10px] border-blue-950 mt-[80px] "tabIndex="0">
            <MdSpaceDashboard className="text-[35px] mx-auto"></MdSpaceDashboard> 
               <h1 className="text-[30px] text-white font-semibold text-center" >Dashboard</h1>
               </div>
               </Link>

               <Link to={"/projects/inprocess"}>
               <div className="focus:border-l-[10px] border-blue-950 mt-[30px]"tabIndex="0">
            <AiOutlineProject className="text-[35px] mx-auto"></AiOutlineProject> 
               <h1 className="text-[30px] text-white font-semibold text-center" >Projects</h1>
               </div>
               </Link>

              <div className="focus:border-l-[10px] border-blue-950"tabIndex="0">
                   <MdDeveloperBoard className="text-[35px] mx-auto mt-[30px]"></MdDeveloperBoard>
              <h1 className="text-[30px] text-white font-semibold text-center">Developers</h1>
              </div>
            </div>

            <Outlet></Outlet>
        </div>
    );
};

export default Root;