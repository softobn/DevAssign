import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const CreateProject = () => {

  const navigate = useNavigate();


// photo select
    const [image,setImage] = useState('');

    const [loading, setLoading] = useState(false);


    const handleChangeImage = (e) => {

        setLoading(true);

        const file = e.target.files[0];


        const formData = new FormData();
  formData.append('image', file);

  console.log(file);


fetch(`https://api.imgbb.com/1/upload?key=96b7b85bb1dcb7f6334d65eb9802db5b`,{
    method: 'POST',
    

    body: formData
})
.then(res => res.json())
.then(data => {
    // get the url that come from img BB 
 
    // save the url in a state
 setImage(data.data.image.url);

 setLoading(false);

});


    }

    const Atoken = localStorage.getItem('Access token');
const Rtoken = localStorage.getItem('Refresh token');

  const token = {Access : Atoken,refresh : Rtoken};



    // create project

    const handleCreateProject = e => {

        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const requirements = form.requirements.value;
       
        const planned_start = form.planned_start.value;
        const planned_end = form.planned_end.value;
        const deadline = form.deadline.value;
       
const newData = {title,description,requirements,thumbnail : image,planned_start,planned_end,deadline} 

console.log(newData);

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
      const response = await fetch('https://softobn.pythonanywhere.com/api/manager/project-create/', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${newtok}`,
        },
        body: JSON.stringify(newData) 
      });
      const data = await response.json();
      console.log(data);


      if(data === "success") {
        Swal.fire({
          title: "Successfully ",
          text: "You successfully create a project",
          icon: "success",      
        }); 
        form.reset();

      navigate(location?.state ? location.state : "/projects/inprocess");  
      }

      if(data === "unsuccess"){
        Swal.fire({
          title: "Error",
          text: "Please enter the information correctly !",
          icon: "error",      
        });
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
  })();

});


    }

   



    return (
        <div className="bg-[url('https://i.ibb.co/d74QQQT/close-up-detail-team-working-o-new-project-coworking-space-writing-ideas-looking-through-graphics-ta.jpg')] bg-cover bg-center hero min-h-screen bg-base-200">




  <div className="hero-content flex-col">
    <div className="text-center ">
      <h1 className="text-5xl font-bold text-blue-500">Create Project If you manager!</h1>
      <h1 className="text-[35px] font-bold text-white">Only manager can create project</h1>
      
    </div>
    <div className=" shrink-0  w-[500px] shadow-2xl bg-slate-500">
      <form onSubmit={handleCreateProject} className="card-body ">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-white">Title</span>
          </label>
          <input type="text" placeholder="Title" name="title" className="input input-bordered" required />
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-white">Description</span>
          </label>
          <input type="text" placeholder="Description" name="description" className="input input-bordered" required />
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-white">Requirements</span>
          </label>
          <input type="text" placeholder="Requirements" name="requirements" className="input input-bordered" required />
        </div>



        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-white">Planned start</span>
          </label>
          <input type="text" placeholder="Year-month-day" name="planned_start" className="input input-bordered" required />
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-white">Planned end</span>
          </label>
          <input type="text" placeholder="Year-month-day" name="planned_end" className="input input-bordered" required />
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-white">Deadline</span>
          </label>
          <input type="text" placeholder="Year-month-day" name="deadline" className="input input-bordered" required />
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-white">Photo</span>
          </label>
          
          <input type="file" onChange={handleChangeImage}  />
          {loading && <span className="loading loading-spinner text-info"></span>}
        </div>



        <div className="">
          <button className="btn bg-blue-500  text-[15px] font-bold">Create project</button>
        </div>
      </form>
    </div>
  </div>
</div>
            
  
    );
};

export default CreateProject;