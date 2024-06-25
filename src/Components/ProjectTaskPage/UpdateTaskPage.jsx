import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddTaskPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { devProjectIds } = location.state;
  const accessToken = localStorage.getItem("Access token");
  const UpdatedData = devProjectIds?.taskList?.find(
    (info) => info.id === devProjectIds?.updateId
  );
  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const deadline = form.deadline.value;
    const requirements = form.requirements.value;
    const taskData = {
      task_id: devProjectIds?.updateId,
      title: title,
      description: description,
      requirements: requirements,
      deadline: deadline,
    };
    (async () => {
      try {
        const response = await fetch(
          "https://softobn.pythonanywhere.com/api/manager/task-update/",
          {
            method: "PATCH",
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
            text: "Task Updated successfully..",
            icon: "success",
          });
          //   form.reset();

          navigate(location?.state ? location?.state.pathname : "/");
        } else {
          return Swal.fire({
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
        <h1 className="font-bold text-center text-3xl">Update Task</h1>
        <h3 className="font-bold text-center text-2xl text-blue-300">
          Only manager have permission to update task.
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
            defaultValue={UpdatedData?.title}
            name="title"
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
            defaultValue={UpdatedData?.deadline}
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
            defaultValue={UpdatedData?.description}
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
            defaultValue={UpdatedData?.requirements}
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
