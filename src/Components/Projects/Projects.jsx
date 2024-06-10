import { Link, Outlet } from "react-router-dom";


const Projects = () => {
    return (
        <div >
            <div className="flex">
            <div className="bg-blue-500 flex justify-center gap-[10px] md:gap-[40px] lg:gap-[40px] w-[80%] md:w-[440px] lg:w-[1340px] text-white  text-center ">
                <Link to={"/projects/inprocess"}>
                <h1 className="text-[25px] font-bold focus:border-b-[6px] mt-[30px] pb-[15px]" tabIndex="0">INPROCESS</h1>
                </Link>
                <Link to={"/projects/complete"}>
                <h1 className="text-[25px] font-bold focus:border-b-[6px]   mt-[30px] pb-[15px]" tabIndex="0">COMPLETE</h1>
                </Link>
            </div>
            <Link to={"/createProject"}>
            <button className="text-[40px] md:text-[45px] bg-slate-600 px-[20px] py-[10px]  text-white">+</button>
            </Link>
            </div>

            <Outlet></Outlet>
        </div>
    );
};

export default Projects;