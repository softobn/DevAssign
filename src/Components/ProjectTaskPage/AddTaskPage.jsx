import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddTaskPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { devProjectIds } = location.state;
  console.log(devProjectIds);
  const accessToken = localStorage.getItem("Access token");
  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const deadline = form.deadline.value;
    const requirements = form.requirements.value;
    const developer = form.developer.value;
    const taskData = {
      title: title,
      project: devProjectIds.projectId,
      developer: developer,
      description: description,
      requirements: requirements,
      deadline: deadline,
    };
    (async () => {
      try {
        const response = await fetch(
          "https://softobn.pythonanywhere.com/api/manager/task-create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(taskData),
          }
        );
        const data = await response.json();
        console.log(data);

        if (data === "success") {
          Swal.fire({
            title: "Successfully ",
            text: "Task Added successfully..",
            icon: "success",
          });
          navigate(location?.state ? location?.state.pathname : "/");
        } else {
          Swal.fire({
            title: "Error",
            text: `${data?.detail}`,
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleAddTask}
        className="border p-5 w-[80%] md:w-[50%] lg:w-[40%] mx-auto my-5 rounded-xl"
      >
        <h1 className="font-bold text-center text-3xl">Add Task</h1>
        <h3 className="font-bold text-center text-2xl text-blue-300">
          Only manager have permission to create task.
        </h3>
        {/* title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-black py-2">
              Title
            </span>
          </label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="input input-bordered"
            required
          />
        </div>
        {/* developer */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-black py-2">
              Developer
            </span>
          </label>
          <input
            type="number"
            // value={devProjectIds?.developerId}
            placeholder="Developer"
            name="developer"
            className="input input-bordered"
            required
          />
        </div>
        {/* deadline */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-black py-2">
              Deadline
            </span>
          </label>
          <input
            type="text"
            placeholder="Year-month-day"
            name="deadline"
            className="input input-bordered"
            required
          />
        </div>
        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-black py-2">
              Description
            </span>
          </label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            className="input input-bordered"
            required
          />
        </div>
        {/* Requirements */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-[20px] font-semibold text-black py-2">
              Requirements
            </span>
          </label>
          <input
            type="text"
            placeholder="Requirements"
            name="requirements"
            className="input input-bordered"
            required
          />
        </div>
        <div className="mt-5">
          <button
            type="Submit"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold border-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPage;
