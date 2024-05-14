import { useEffect, useState } from "react";


const Complete = () => {

    const [projectinfo , setProjectinfo] = useState([]);


    useEffect( () => {

      
        fetch(`https://softobn.pythonanywhere.com/api/user/project-list/?is_active=False`,{
          method:"GET",
          credentials: "include",
          headers: {
              "content-type":"application/json",
              
          },
          
          
      })
      .then(res => res.json())
      .then(data => {
        
        console.log(data);
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
        <th className="border-y-2">No</th>
        <th className="border-y-2">Title</th>
        <th className="border-y-2">Status</th>
        <th className="border-y-2">Deadline</th>
      </tr>
    </thead>
   {
    projectinfo.map((item,index) =>  <tbody>
        {/* row 1 */}
        <tr className=" text-[18px] text-center">
          <th className="border-y-2">{index+1}</th>
          <td className="border-y-2">{item.title}</td>

          {
            item.is_complete === true ? <td className="border-y-2"><span className="bg-lime-400  text-white font-bold px-[5px] py-[4px]">Done</span></td> : <td className="border-y-2"><span className="bg-blue-500  text-white font-bold px-[5px] py-[4px]">Due</span></td>
          }
          
          <td className="border-y-2">{item.deadline}</td>
        </tr>
  
      </tbody>)
   }
  </table>
</div>
        </div>
    );
};

export default Complete;