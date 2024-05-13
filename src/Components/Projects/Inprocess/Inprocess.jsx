import { useEffect, useState } from "react";


const Inprocess = () => {

    const [projectinfo , setProjectinfo] = useState([]);

    useEffect( () => {

      
        fetch(`https://softobn.pythonanywhere.com/api/user/project-list/`,{
          method:"GET",
          credentials: "include",
          headers: {
              "content-type":"application/json",
              
          },
          
          
      })
      .then(res => res.json())
      .then(data => {
        
  setProjectinfo(data);
     
    
      })
      },[setProjectinfo]);

    return (
        <div>
            <div className="overflow-x-auto mt-[20px]">
  <table className="table ">
    {/* head */}
    <thead>
      <tr className=" text-[20px] text-center">
        <th className="border-2">No</th>
        <th className="border-2">Title</th>
        <th className="border-2">Status</th>
        <th className="border-2">Deadline</th>
      </tr>
    </thead>
   {
    projectinfo.map((item,index) =>  <tbody>
        {/* row 1 */}
        <tr className=" text-[18px] text-center">
          <th className="border-2">{index+1}</th>
          <td className="border-2">{item.title}</td>

          {
            item.is_complete === true && item.is_active === true  ? <td className="border-2 "><span className="bg-red-400  text-white font-bold px-[5px] py-[4px]">Lately</span></td>  : item.is_complete === false && item.is_active === true ? <td className="border-2"><span className="bg-blue-400  text-white font-bold px-[5px] py-[4px]">Ongoing</span></td> : item.is_complete === true && item.is_active === false ? <td className="border-2"><span className="bg-lime-400  text-white font-bold px-[5px] py-[4px]">Done</span></td> : ''
          }
          
          <td className="border-2">{item.deadline}</td>
        </tr>
  
      </tbody>)
   }
  </table>
</div>
        </div>
    );
};

export default Inprocess;