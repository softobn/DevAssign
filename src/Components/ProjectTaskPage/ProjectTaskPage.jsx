import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiMinimize, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";

const ProjectTaskPage = () => {
  const [allProjectInfo, setAllProjectInfo] = useState([]);
  const [showSubTask, setShowSubTask] = useState([]);
  const [addIcon, setAddIcon] = useState("");
  console.log(addIcon);
  console.log("showSubTask", showSubTask);
  const { id } = useParams();
  console.log(id);
  const [taskList, setTaskList] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [updatedSubTaskId, setUpdatedSubTaskId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  console.log("taskList", taskList);
  const [newtok, setNewtok] = useState("");
  console.log("newtok", newtok);
  const accessToken = localStorage.getItem("Access token");
  const refreshToken = localStorage.getItem("Refresh token");
  const token = { Access: accessToken, refresh: refreshToken };
  console.log(token);

  useEffect(() => {
    fetch(`https://softobn.pythonanywhere.com/api/user/project-list/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllProjectInfo(data);
      });
  }, []);
  // projectInfo-> find to get current project id.
  const projectInfo = allProjectInfo?.find((info) => info?.id !== id);
  // console.log(projectInfo);

 

    // useEffect(() => {
    //   fetch(
    //     `https://softobn.pythonanywhere.com/api/user/task-list/?project_id=${id}`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //       setTaskList(data)
        
    //     });
    // },[]);

    // console.log(taskList);
  
  

  const handleShowTask = () => {

    setisComment(false);
    setAddIcon("task");
    fetch(
      `https://softobn.pythonanywhere.com/api/user/task-list/?project_id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
          
        
        setTaskList(data)
      });
  };

  // projects-> find the current task id.
  const projects = taskList?.find((task) => task?.project);
  const devProjectIds = {
    projectId: id,
    developerId: projects?.developer,
    taskList,
    updateId,
    showSubTask,
    updatedSubTaskId,
  };
  const handleSubTasks = () => {
    setAddIcon("subtask");

    setisComment(false);

    fetch(`https://softobn.pythonanywhere.com/api/user/refresh/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewtok(data.access);
      });

    console.log(newtok);



    fetch(
      `https://softobn.pythonanywhere.com/api/user/subtask-list/?task_id=${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${newtok}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // setTaskList(data);
        setShowSubTask(data);
        console.log(data);
      });
  };
  const handleAddSubTask = () => {
    navigate("/createSubtasks", {
      state: {
        devProjectIds,
        pathname: location?.pathname,
      },
    });
  };
  const handleUpdateSubTask = (id) => {
    setUpdatedSubTaskId(id);
    console.log(id);
    if (updatedSubTaskId > 0) {
      navigate("/updateSubTask", {
        state: {
          devProjectIds,
          pathname: location?.pathname,
        },
      });
    }
  };
  const handleAddTask = () => {
    navigate("/addTask", {
      state: {
        devProjectIds,
        pathname: location?.pathname,
      },
    });
  };
  const handleUpdateTask = (id) => {
    setUpdateId(id);
    console.log(id);
    if (updateId > 0) {
      navigate("/updateTask", {
        state: {
          devProjectIds,
          pathname: location?.pathname,
        },
      });
    }
  };
 
  // old
  const handleMarkStatus = async (id) => {
    // console.log(id);
    fetch(`https://softobn.pythonanywhere.com/api/user/refresh/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewtok(data.access);
      });

    console.log("newtok", newtok);
    try {
      const status = {
        task_id: id,
      };
      console.log("status", status);
      const response = await fetch(
        "https://softobn.pythonanywhere.com/api/developer/task-mark/",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newtok}`,
          },
          body: JSON.stringify(status),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data === "success") {
        Swal.fire({
          title: "Successfully ",
          text: " successfully marked",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `${data?.detail}`,
          icon: "error",
        });
      }
      if (data === "unsuccess") {
        Swal.fire({
          title: "Error",
          text: "Please enter the information correctly !",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

// Comment Section


 
const [isComment,setisComment] = useState(false);

const [commentList,setCommentList] = useState([]);

const [taskOrSubtask,setTaskOrSubtask] = useState('');

const [TorSid,setTorSid] =useState('')



const handleComment = (id,addIcon) => {


setTaskOrSubtask(addIcon);



setTorSid(id);


console.log(addIcon);



    fetch(`https://softobn.pythonanywhere.com/api/user/comment-list/?${addIcon}_id=${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
       console.log(data);

       setCommentList(data);
      });
};






// create comment

const handleCreateComment = (e) => {
  

  e.preventDefault();

  const reply = e.target.comment.value;

  console.log(reply);


  // create task's section comment 
  if(taskOrSubtask === 'task'){
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

  const newtok = data.access;


  (async () => {
    try {
      const response = await fetch('https://softobn.pythonanywhere.com/api/user/comment-create/', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${newtok}`,
        },
        body: JSON.stringify({reply : reply, task : TorSid}) 
      });
      const data = await response.json();
      console.log(data);

      e.target.reset();

      fetch(`https://softobn.pythonanywhere.com/api/user/comment-list/?task_id=${TorSid}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
         console.log(data);
  
         setCommentList(data);
        });

    } catch (error) {
      console.error('Error:', error);
    }
  })();

});
  }

// create subtask's section comment
  if(taskOrSubtask === 'subtask'){
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

  const newtok = data.access;


  (async () => {
    try {
      const response = await fetch('https://softobn.pythonanywhere.com/api/user/comment-create/', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${newtok}`,
        },
        body: JSON.stringify({reply : reply, subtask : TorSid}) 
      });
      const data = await response.json();
      console.log(data);

      e.target.reset();

      fetch(`https://softobn.pythonanywhere.com/api/user/comment-list/?subtask_id=${TorSid}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
         console.log(data);
  
         setCommentList(data);
        });

    } catch (error) {
      console.error('Error:', error);
    }
  })();

});
  }




};




  
  return (
    <div className="w-full md:max-h-[100vh] overflow-hidden">
      <div className="overflow-auto">
        <div className="grid gap-2 grid-cols-2 mb-5">
          <button
            onClick={handleShowTask}
            className="btn w-full bg-pink-500 text-white border-none focus:bg-blue-500 hover:bg-blue-400"
          ><span>Task</span></button>
          <button
            onClick={handleSubTasks}
            className="btn bg-teal-500 text-white border-none w-full focus:bg-blue-500 hover:bg-blue-400"
          >
           <span>Sub-Task</span>
          </button>
        </div>

        <div className="text-center text-lg md:text-xl font-bold space-y-1">
          <h1>Project Title: {projectInfo?.title}</h1>
          <p>Deadline:{projectInfo?.deadline}</p>
          <p>Requirements: {projectInfo?.requirements}</p>
        </div>
      
         {
          isComment === false ? <div className="overflow-x-auto overflow-auto min-h-[30vh] md:max-h-[45vh] lg:max-h-[40vh] xl:max-h-[55vh] ">
          {/* new added */}
         
          <table className="table">
           
            {/* head */}
            <thead>
              <tr className="font-bold">
                <th>*</th>
                <th className="font-bold">
                  {addIcon === "task" ? "Task Title" : "Sub-Task Title"}
                </th>
                <th className="font-bold">Email</th>
                {addIcon === "sub-task" && (
                  <th className="font-bold">Task Title</th>
                )}
                <th className="font-bold">Deadline</th>
                <th className="font-bold">Requirements</th>
                <th className="font-bold">Description</th>
                <th className="font-bold">Update</th>
                <th className="font-bold">Status</th>
                <th className="font-bold">Comments</th>
              </tr>
            </thead>
            {(showSubTask.length >= 0 && addIcon !== "task"
              ? showSubTask
              : taskList
            )?.map((info, index) => (
              <tbody key={index}>
                <tr className="font-medium">
                  <th>{index + 1}</th>
                  <td>{info?.title}</td>
                  <td>
                    <div className="flex gap-1 items-center">
                      <MdOutlineMarkEmailUnread size={20} />
                      {info?.developer_email}
                    </div>
                  </td>
                  {addIcon === "subtask" && <td>{info?.task_title}</td>}
                  <td>{info?.deadline}</td>
                  <td>{info?.requirements}</td>
                  <td>{info?.description}</td>
                  <td>
                    <div className="">
                      {addIcon === "task" ? (
                        <button
                          onClick={() => handleUpdateTask(info?.id)}
                          className="font-bold text-white rounded-md px-3 py-1 bg-blue-600"
                        >
                          <span onChange={() => setUpdateId(info.id)}>
                            Update
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateSubTask(info?.id)}
                          className="font-bold text-white rounded-md px-3 py-1 bg-blue-600"
                        >
                          Update
                        </button>
                      )}
                      <p className="text-xs text-center text-red-400">
                        Please double click
                      </p>
                    </div>
                  </td>
                  <td>
                    {addIcon === "task" && (
                      <div className="">
                        {info?.is_complete === false &&
                        info?.is_active === true ? (
                          <button
                            onClick={() => handleMarkStatus(info?.id)}
                            className="font-bold text-white rounded-md px-3 py-1 bg-pink-500"
                          >
                            On Going
                          </button>
                        ) : info?.is_complete === true &&
                          info?.is_active === true ? (
                          <button className="font-bold text-white rounded-md px-3 py-1 bg-red-500">
                            Lately
                          </button>
                        ) : info?.is_complete === true &&
                          info?.is_active === false ? (
                          <button className="font-bold text-white rounded-md px-3 py-1 bg-green-700">
                            Done
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    {addIcon === "subtask" && (
                      <div>
                        {info?.is_complete === true ? (
                          <button className="font-bold text-white rounded-md px-3 py-1 bg-green-800">
                            Done
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMarkStatus(info?.id)}
                            className="font-bold text-white rounded-md px-3 py-1 bg-pink-500"
                          >
                            On Going
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleComment(info.id,addIcon)}
                      className='font-bold text-white rounded-md px-3 py-1 bg-teal-500 focus:bg-blue-400' tabIndex='0'
                    >
                      <span onClick={() => setisComment(true)}>Comments</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div> :

<div className="flex flex-col md:flex-row">
<div className="overflow-x-auto overflow-auto min-h-[30vh] md:max-h-[45vh] lg:max-h-[40vh] xl:max-h-[55vh] md:w-[600px] lg:w-[1100px]">
 {/* new added */}

 <table className="table">
  
   {/* head */}
   <thead>
     <tr className="font-bold">
       <th>*</th>
       <th className="font-bold">
         {addIcon === "task" ? "Task Title" : "Sub-Task Title"}
       </th>
       <th className="font-bold">Email</th>
       {addIcon === "subtask" && (
         <th className="font-bold">Task Title</th>
       )}
       <th className="font-bold">Deadline</th>
       <th className="font-bold">Requirements</th>
       <th className="font-bold">Description</th>
       <th className="font-bold">Update</th>
       <th className="font-bold">Status</th>
       <th className="font-bold">Comments</th>
     </tr>
   </thead>
   {(showSubTask.length >= 0 && addIcon !== "task"
     ? showSubTask
     : taskList
   )?.map((info, index) => (
     <tbody key={index}>
       <tr className="font-medium ">
         <th>{index + 1}</th>
         <td>{info?.title}</td>
         <td>
           <div className="flex gap-1 items-center">
             <MdOutlineMarkEmailUnread size={20} />
             {info?.developer_email}
           </div>
         </td>
         {addIcon === "subtask" && <td>{info?.task_title}</td>}
         <td>{info?.deadline}</td>
         <td>{info?.requirements}</td>
         <td>{info?.description}</td>
         <td>
           <div className="">
             {addIcon === "task" ? (
               <button
                 onClick={() => handleUpdateTask(info?.id)}
                 className="font-bold text-white rounded-md px-3 py-1 bg-blue-600"
               >
                 <span onChange={() => setUpdateId(info.id)}>
                   Update
                 </span>
               </button>
             ) : (
               <button
                 onClick={() => handleUpdateSubTask(info?.id)}
                 className="font-bold text-white rounded-md px-3 py-1 bg-blue-600"
               >
                 Update
               </button>
             )}
             <p className="text-xs text-center text-red-400">
               Please double click
             </p>
           </div>
         </td>
         <td>
           {addIcon === "task" && (
             <div className="">
               {info?.is_complete === false &&
               info?.is_active === true ? (
                 <button
                   onClick={() => handleMarkStatus(info?.id)}
                   className="font-bold text-white rounded-md px-3 py-1 bg-pink-500"
                 >
                   On Going
                 </button>
               ) : info?.is_complete === true &&
                 info?.is_active === true ? (
                 <button className="font-bold text-white rounded-md px-3 py-1 bg-red-500">
                   Lately
                 </button>
               ) : info?.is_complete === true &&
                 info?.is_active === false ? (
                 <button className="font-bold text-white rounded-md px-3 py-1 bg-green-700">
                   Done
                 </button>
               ) : (
                 ""
               )}
             </div>
           )}
           {addIcon === "subtask" && (
             <div>
               {info?.is_complete === true ? (
                 <button className="font-bold text-white rounded-md px-3 py-1 bg-green-800">
                   Done
                 </button>
               ) : (
                 <button
                   onClick={() => handleMarkStatus(info?.id)}
                   className="font-bold text-white rounded-md px-3 py-1 bg-pink-500"
                 >
                   On Going
                 </button>
               )}
             </div>
           )}
         </td>
         <td>
           <button
             onClick={() => handleComment(info.id,addIcon)}
             className="font-bold text-white rounded-md px-3 py-1 bg-teal-500 focus:bg-blue-400" tabIndex="0"
           >
             Comments
           </button>
         </td>
       </tr>
     </tbody>
   ))}
 </table>
</div>
{/* comment section */}
<div className="bg-slate-200 md:w-[550px] lg:w-[350px] overflow-y-auto md:h-[375px] lg:h-[508px]">
 <h1 className="text-[25px] font-bold pl-[20px] py-[5px] border-b-2 border-b-gray-500 flex items-center">Comment ({commentList.length}) <span><IoCloseCircleSharp onClick={() => setisComment(false)} className="text-[35px] text-red-400 ml-[110px]"></IoCloseCircleSharp></span></h1>

 {
 commentList.map(data => <div className="py-[10px] px-[15px] flex  gap-[10px] border-b-2 border-b-gray-500">
 <img className="w-[50px] h-[50px] rounded-[50%]" src={data.user_picture} alt="" />

 <div>
 <h1 className="text-[22px] font-bold">{data.user_first_name}</h1>

<p className="text-[16px] font-medium text-left">{data.reply}</p>
 </div>
</div>)
 }


<div>
<form  className="border-t-1 border-t-gray-500 py-[15px] px-[10px]  flex items-center gap-[10px] " onSubmit={handleCreateComment}>
<input className=" pl-[10px] py-[8px] w-full bg-white" id="text" name="comment"  type="text" placeholder="Write your comment here" />
<button><IoSend  className="size-[35px] items-center"></IoSend></button>
</form>
</div>


</div>

</div>
         }


       
        {addIcon === "task" && (
          <div className="w-full mx-auto my-3 flex justify-center">
            <button
              title="Add Task"
              onClick={handleAddTask}
              className="p-2 border-none text-center rounded-full text-white bg-pink-500"
            >
              <FiPlus size={60} />
            </button>
          </div>
        )}
        {addIcon === "subtask" && (
          <div className="w-full mx-auto my-3 flex justify-center">
            <button
              title="Add Sub-Task"
              onClick={handleAddSubTask}
              className="p-2 border-none text-center rounded-full text-white bg-teal-500"
            >
              {/* <FiMinimize size={60} /> */}
              <FiPlus size={60} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectTaskPage;
