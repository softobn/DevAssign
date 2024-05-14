import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const userEmail = form.email.value;
    const userPassword = form.password.value;

    const userData = {
      email: userEmail,
      password: userPassword,
    };
    console.log(userData);


    (async () => {
      try {
        const response = await fetch('https://softobn.pythonanywhere.com/api/user/login/', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData) 
        });
        const data = await response.json();

        localStorage.setItem('Access token', data.access);
        localStorage.setItem('Refresh token', data.refresh);

        if(data.access) {
          Swal.fire({
            title: "Successfully login",
            text: "You are now login in DevAssign",
            icon: "success",      
          });   
          
          form.reset();
    
          navigate(location?.state ? location.state : "/dashboard");
        }
    
        if(data.detail === "No active account found with the given credentials"){
          Swal.fire({
            title: "No active account",
            text: "No active account found with the given information!",
            icon: "question",      
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    })();


  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <div className="w-[80%] md:w-[40%] lg:w-[30%] xl:w-[20%] mx-auto">
        <div className="">
          <img
            className="size-24 mx-auto"
            src="https://cdn2.iconfinder.com/data/icons/startup-management/325/Project_management_Project_Descriptions-512.png?fbclid=IwZXh0bgNhZW0CMTAAAR1z9IO1oyIC0wRGgpyOFVi_6b3_aBaHsWzACzGeAgs9Mh72m1SY6qzI9CM_aem_AQaTCSiUZ6543VnRrmX8N2GKeCNuoMTbWuDUdTlQRy4mDQZrpz6un0jUZCHZ_asSyGbnoqGmnVwvSU8eGZl9xRoe"
            alt=""
          />
          <p className="text-lg font-medium text-white text-center">
            DecAssign
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="my-2 px-5 py-8 space-y-5 bg-gray-600"
        >
          {/* email */}
          <div className="w-full">
            <input
              className="w-full h-[40px] p-2"
              placeholder="Enter your email address..."
              type="email"
              name="email"
              id=""
            />
          </div>
          {/* password */}
          <div className="w-full relative">
            <input
              className="w-full h-[40px] p-2"
              placeholder="Enter your password..."
              type={showPassword ? "text" : "password"}
              name="password"
              id=""
            />
            <span
              className="text-lg absolute top-[30%] right-2 text-black font-medium"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye></FiEye> : <FiEyeOff></FiEyeOff>}
            </span>
          </div>
          <div className="w-full">
            <button
              className="flex justify-center px-8 py-2 mx-auto rounded-full bg-green-500 text-white border-none"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
