import { useEffect, useState } from "react";

const Developer = () => {
  const [allDevelopersData, setAllDevelopersData] = useState([]);
  useEffect(() => {
    fetch("https://softobn.pythonanywhere.com/api/user/developer-list/")
      .then((res) => res.json())
      .then((data) => setAllDevelopersData(data));
  }, []);
  return (
    <div className="">
      <div className="grid grid-cols-1 w-full md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 py-5">
        {allDevelopersData.map((data, index) => (
          <div data-aos="fade-up-left"
            key={index}
            className="flex w-full gap-2 rounded-xl overflow-hidden shadow-2xl drop-shadow-2xl bg-blue-400"
          >
            <div className="w-[130px]">
              {data?.profile_picture ? (
                <img
                  className="object-fill h-full w-full"
                  src={data?.profile_picture}
                  alt=""
                />
              ) : (
                <img
                  className="object-fill h-full w-full"
                  src="https://i.ibb.co/mtL872C/image.png"
                  alt=""
                />
              )}
            </div>
            <div className="space-y-1 px-1 text-white">
              <h2 className="font-bold md:text-lg">
                <span>{data?.first_name}</span> <span>{data?.last_name}</span>
              </h2>
              <p className="font-medium text-base">{data?.phone_number}</p>
              <p className="font-medium">{data?.email}</p>
              <p className="font-medium">{data?.gender}</p>
              <p className="font-medium">{data?.religion}</p>
              <p className="font-medium">Project {data?.total_project}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developer;
