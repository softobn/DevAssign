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
  <table className="table bg-slate-500">
    {/* head */}
    <thead>
      <tr className="text-white text-[20px] text-center">
        <th className="border-2">No</th>
        <th className="border-2">Title</th>
        <th className="border-2">Status</th>
        <th className="border-2">Deadline</th>
      </tr>
    </thead>
   {
    projectinfo.map((item,index) =>  <tbody>
        {/* row 1 */}
        <tr className="text-white text-[18px] text-center">
          <th className="border-2">{index+1}</th>
          <td className="border-2">{item.title}</td>

          {
            item.is_complete === true ? <td className="border-2">Complete</td> :<td className="border-2">Inprocess</td>
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