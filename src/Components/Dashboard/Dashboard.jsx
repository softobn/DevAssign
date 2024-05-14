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
      
           <div className=" bg-blue-500 w-[1500px] ">
           <div className="flex flex-wrap  gap-[10px] ml-[60px] md:ml-[50px] mt-[50px]">
  
  <div className="md:w-[120px] lg:w-[250px] rounded-[8px] bg-white">
    <FaPeopleGroup className="text-[38px] mx-auto text-orange-400"></FaPeopleGroup>
    <div>
    <h1 className="text-[18px] font-semibold text-center">Developers</h1>
    <h1 className="stat-value text-center text-orange-400">{developer}</h1>
    </div>
  </div>
  <div className="md:w-[120px] lg:w-[250px] rounded-[8px] bg-white">
  <MdOutlineCreateNewFolder className="text-[38px] mx-auto text-lime-500"></MdOutlineCreateNewFolder>
    <div className="text-[18px] font-semibold text-center">Created projects</div>
    <div className="stat-value text-center text-lime-500">{Created}</div>
   
  </div>
  <div className="md:w-[120px] lg:w-[250px] rounded-[8px]  py-[10px] bg-white">
  <GrInProgress className="text-[33px] mx-auto text-yellow-400"></GrInProgress>
    <div className="text-[18px] font-semibold text-center">In process project</div>
    <div className="stat-value text-center text-yellow-400">{process}</div>
   
  </div>
  <div className="md:w-[120px] lg:w-[250px] rounded-[8px] bg-white">
  <IoIosCloudDone className="text-[38px] mx-auto text-red-400"></IoIosCloudDone>
    <div className="text-[18px] font-semibold text-center">Completed project</div>
    <div className="stat-value text-center text-red-400">{completed}</div>
   
  </div>

  
</div>



    <div className="flex mt-[30px] gap-[30px] ml-[50px]">
    <img className="bg-white h-[300px] w-[500px] py-[10px] px-[10px]" src="https://www.shutterstock.com/shutterstock/videos/1016301331/thumb/5.jpg" alt="" />
    <img className="bg-white h-[300px] w-[500px] py-[10px] px-[10px]" src="https://th.bing.com/th/id/R.7bae49faf3273d7cbe92dd94d8c1f698?rik=yQAh2Zus07iIfw&pid=ImgRaw&r=0&fbclid=IwAR3287cAaUqXprULpJ9G7PB0xeNw-WgVWsVf7sXLnvV189ZWQqalKaFVAtI" alt="" />
    </div>
<div className="flex mt-[30px] gap-[30px] ml-[50px]">
<img className="bg-white h-[300px] w-[500px] py-[5px] px-[10px]" src="https://th.bing.com/th/id/OIP.Zlrbkz_7aKhCuvC_o_IaNgHaI4?rs=1&pid=ImgDetMain&fbclid=IwAR1UT7U7TwP1wrve9aGoOrz97DweOAip_x8mI32EoTDnuQn6i3UV9jJpMME" alt="" />
    <img className="bg-white h-[300px] w-[500px] py-[5px] px-[10px]" src="https://i.ibb.co/N1BgwYg/pie-chart-european-parlament-election.png" alt="" />
</div>
 
           </div>
    );
};

export default Dashboard;