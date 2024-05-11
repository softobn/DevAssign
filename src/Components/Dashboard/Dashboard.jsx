import { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { IoIosCloudDone } from "react-icons/io";


const Dashboard = () => {

    const [developer,setDeveloper] = useState('')
    const [Created,setCreated] = useState('')
    const [process,setprocess] = useState('')
    const [completed,setcompleted] = useState('')

useEffect(() => {
    fetch(`https://softobn.pythonanywhere.com/api/user/developer-count/`,{
        method:"GET",
        credentials: "include",
        headers: {
            "content-type":"application/json",
           
        },
        
        
    })
    .then(res => res.json())
    .then(data => {
      
   console.log(data);
    
  setDeveloper(data.developer)
    })
} ,[setDeveloper])


useEffect(() => {
    fetch(`https://softobn.pythonanywhere.com/api/user/project-created/`,{
        method:"GET",
        credentials: "include",
        headers: {
            "content-type":"application/json",
           
        },
        
        
    })
    .then(res => res.json())
    .then(data => {
      
   console.log(data);
    
  setCreated(data.created)
    })
} ,[setCreated])



useEffect(() => {
    fetch(`https://softobn.pythonanywhere.com/api/user/project-inprocess/`,{
        method:"GET",
        credentials: "include",
        headers: {
            "content-type":"application/json",
           
        },
        
        
    })
    .then(res => res.json())
    .then(data => {
      
   console.log(data);
    
  setprocess(data.inprocess)
    })
} ,[setprocess])


useEffect(() => {
    fetch(`https://softobn.pythonanywhere.com/api/user/project-done/`,{
        method:"GET",
        credentials: "include",
        headers: {
            "content-type":"application/json",
           
        },
        
        
    })
    .then(res => res.json())
    .then(data => {
      
   console.log(data);
    
  setcompleted(data.done)
    })
} ,[setcompleted])

    return (
      
           <div className="mt-[50px]">
           <div className="flex flex-wrap  gap-[10px] ml-[60px] md:ml-0">
  
  <div className="w-[250px] rounded-[8px] bg-slate-500 py-[10px]  text-white">
    <FaPeopleGroup className="text-[38px] mx-auto"></FaPeopleGroup>
    <div>
    <h1 className="text-[18px] font-semibold text-center">Developer Number</h1>
    <h1 className="stat-value text-center">{developer}</h1>
    </div>
  </div>
  <div className="w-[250px] rounded-[8px] bg-slate-500 py-[10px] text-white">
  <MdOutlineCreateNewFolder className="text-[38px] mx-auto"></MdOutlineCreateNewFolder>
    <div className="text-[18px] font-semibold text-center">Created project Number</div>
    <div className="stat-value text-center">{Created}</div>
   
  </div>
  <div className="w-[250px] rounded-[8px]  py-[10px] bg-slate-500 text-white">
  <GrInProgress className="text-[38px] mx-auto"></GrInProgress>
    <div className="text-[18px] font-semibold text-center">Project inprocess Number</div>
    <div className="stat-value text-center">{process}</div>
   
  </div>
  <div className="w-[250px] rounded-[8px] bg-slate-500 py-[10px]  text-white">
  <IoIosCloudDone className="text-[38px] mx-auto"></IoIosCloudDone>
    <div className="text-[18px] font-semibold text-center">Complete project Number</div>
    <div className="stat-value text-center">{completed}</div>
   
  </div>
  
</div>
           </div>
    );
};

export default Dashboard;