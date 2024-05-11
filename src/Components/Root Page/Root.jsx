import Navbar from "../Navbar/Navbar";


const Root = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <div className="bg-blue-500 w-[250px]  h-[500px]">
               <div>
               <h1 className="text-[30px] text-white font-semibold pl-[20px] relative top-[40px]    py-[10px] focus:bg-slate-400" tabIndex="0">projects</h1>

               <p className="text-white text-[20px] relative top-[30px] ml-[80px]">- zisan project</p>
               </div>


                <h1 className="text-[30px] text-white font-semibold pl-[20px] relative top-[40px]  focus:bg-slate-400 py-[10px]" tabIndex="0">Developers</h1>
            </div>
        </div>
    );
};

export default Root;