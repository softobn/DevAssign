import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Inprocess = () => {
  const [projectinfo, setProjectinfo] = useState([]);
  console.log(projectinfo);

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
        setProjectinfo(data);
      });
  }, [setProjectinfo]);

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
          {projectinfo.map((item, index) => (
            <tbody key={index}>
              {/* row 1 */}
              <tr className=" text-[18px] text-center">
                <th className="border-y-2">{index + 1}</th>
                <td className="border-y-2">{item.title}</td>

                {item.is_complete === true ? (
                  <td className="border-y-2 ">
                    <span className="bg-red-400  text-white font-bold px-[5px] py-[4px]">
                      Lately
                    </span>
                  </td>
                ) : (
                  <td className="border-y-2">
                    <span className="bg-lime-500  text-white font-bold px-[5px] py-[4px]">
                      Ongoing
                    </span>
                  </td>
                )}

                <td className="border-y flex gap-5 justify-center">
                  {item.deadline}
                  <Link to={`/tasks/${item?.id}`}>
                    <IoIosArrowForward size={25} className="font-bold text-blue-700"/>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Inprocess;
