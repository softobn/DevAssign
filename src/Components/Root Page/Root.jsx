
import { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import { MdDeveloperBoard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const Root = () => {


    const Atoken = localStorage.getItem('Access token');
    const Rtoken = localStorage.getItem('Refresh token');
  
    const token = {Access : Atoken,refresh : Rtoken};

    const [userData,setUserData] = useState([]);
    
    const [newtok,setNewtok] = useState('');


    useEffect( () => {
        fetch(`https://softobn.pythonanywhere.com/api/user/refresh/`,{
          method:"POST",
          credentials: "include",
          headers: {
              "content-type":"application/json",
              
          },
          body:  JSON.stringify(token) ,
          
      })
      .then(res => res.json())
      .then(data => {

       
  
        setNewtok(data.access);
    
      })
      },[setNewtok]);



      useEffect( () => {
        fetch(`https://softobn.pythonanywhere.com/api/user/profile/`,{
          method:"GET",
          credentials: "include",
          headers: {
              "content-type":"application/json",
              "Authorization": `Bearer ${newtok}`,
          },
          
          
      })
      .then(res => res.json())
      .then(data => {
        
      console.log(data);
      setUserData(data);
    
      })
      },[newtok,setUserData]);

   const {first_name,profile_picture} = userData;


//    logout work

const handleLogout = () => {
    localStorage.removeItem('Refresh token');
    localStorage.removeItem('Access token');
  
    location.reload();
}


    return (
        <div className="flex flex-col md:flex-row gap-[20px]">

            
         
            <div className="bg-blue-500 w-full md:w-[220px] lg:w-[250px]  md:h-[1000px] ">

           <div className="flex pt-[20px]">
            <img className="h-[50px] w-[50px]" src="https://i.ibb.co/288YtK5/1245850.png" alt="" />
           <h1 className="text-center text-[28px] text-white font-bold">Dev<span className="text-blue-900">Assign</span></h1>

           </div>

           {
            Atoken ?  <div className="relative top-[40px] ">

            <div className="dropdown ml-[140px] md:ml-[60px] lg:ml-[80px]">
          <div tabIndex={0} role="button" className=""> {
                    profile_picture ? <img className="h-[100px] w-[100px] rounded-[50%] mx-auto" src={profile_picture} alt="" />
                    : 
                    <img className="h-[100px] w-[100px] rounded-[50%] mx-auto" src="https://i.ibb.co/Hrzhnr8/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg" alt="" />
                }</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow  rounded-box w-[150px] bg-white">
            <li className="hover:bg-blue-500 rounded-[10px] font-bold text-[20px]"><a>Profile</a></li>
            <li onClick={handleLogout} className="hover:bg-blue-500 rounded-[10px] font-bold text-[20px]"><a>Logout</a></li>
          </ul>
        </div>
                 <h1 className="text-[25px] text-white font-bold ml-[140px] md:ml-[60px] lg:ml-[80px]"><span className="text-slate-800">Hi</span> {first_name}</h1>    
            </div> :
           
           <div className="flex gap-[20px] relative top-[40px] ml-[100px]  md:ml-[15px] lg:ml-[30px]" >
            <Link to={"/login"}>
            <button className="btn hover:bg-slate-600 text-blue-500">Login</button>
            </Link>
            <Link to={"/registration"}>
            <button className="btn hover:bg-slate-600 text-blue-500">Signup</button>
            </Link>
           </div>

           }

   

               <Link to={'/'}>
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

              <Link to={'/developer'}>
              <div className="focus:border-l-[10px] border-blue-950"tabIndex="0">
                   <MdDeveloperBoard className="text-[35px] mx-auto mt-[30px]"></MdDeveloperBoard>
              <h1 className="text-[30px] text-white font-semibold text-center">Developers</h1>
              </div>
              </Link>
            </div>

            <Outlet></Outlet>
        </div>
    );
};

export default Root;