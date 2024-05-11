import Navbar from "../Navbar/Navbar";
import { AiOutlineProject } from "react-icons/ai";
import { MdDeveloperBoard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";

const Root = () => {
    return (
        <div className="">

            
         
            <div className="bg-blue-500 w-[200px]  h-[1000px] ">

            <h1 className="text-center text-[28px] text-white font-bold pt-[20px]">DevAssign</h1>

    <div className="relative top-[40px] ">
        <img className="h-[100px] w-[100px] rounded-[50%] mx-auto" src="https://i.ibb.co/Hrzhnr8/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg" alt="" />
    </div>

               <div className="focus:border-l-[10px] border-blue-950 mt-[80px] "tabIndex="0">
            <MdSpaceDashboard className="text-[35px] mx-auto"></MdSpaceDashboard> 
               <h1 className="text-[30px] text-white font-semibold text-center" >Dash Board</h1>
               </div>

               <div className="focus:border-l-[10px] border-blue-950 mt-[30px]"tabIndex="0">
            <AiOutlineProject className="text-[35px] mx-auto"></AiOutlineProject> 
               <h1 className="text-[30px] text-white font-semibold text-center" >projects</h1>
               </div>

              <div className="focus:border-l-[10px] border-blue-950"tabIndex="0">
                   <MdDeveloperBoard className="text-[35px] mx-auto mt-[30px]"></MdDeveloperBoard>
              <h1 className="text-[30px] text-white font-semibold text-center">Developers</h1>
              </div>
            </div>
        </div>
    );
};

export default Root;