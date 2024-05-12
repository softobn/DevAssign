import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
const RegistrationPage = () => {
  const [showDetails, setShowDetails] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const [userGender, setUserGender] = useState("");
  const [userMaritalStatus, setUserMaritalStatus] = useState("");

  const [photo,setPhoto] = useState('')



// photo work

const formData = new FormData();
  formData.append('image', showDetails);

fetch(`https://api.imgbb.com/1/upload?key=96b7b85bb1dcb7f6334d65eb9802db5b`,{
  method: 'POST',
  

  body: formData
})
.then(res => res.json())
.then(data => {
  // get the url that come from img BB 

  // save the url in a state
  setPhoto(data.data.image.url)

});

console.log(photo);




  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const userFirstName = form.firstName.value;
    const userLastName = form.lastName.value;
    const userEmail = form.email.value;
    const userPhoneNumber = form.phoneNumber.value;
    const userBirthData = form.birthData.value;
    const userReligion = form.religion.value;
    const userAddress = form.address.value;
    const userPassword = form.password.value;
    const userReEnterPassword = form.reEnterPassword.value;
    const userArea = form.area.value;
     const DotNeededData = {
  phone_number: userPhoneNumber,
  email: userEmail,
  first_name: userFirstName,
  last_name: userLastName,
  gender: userGender,
  religion: userReligion,
  date_of_birth: userBirthData,
  area: userArea,
  address: userPassword,
  marital_status: userMaritalStatus,
  profile_picture: photo,
  password: userReEnterPassword,
};
   
    console.log(DotNeededData);
      
// register

fetch('https://softobn.pythonanywhere.com/api/user/developer-register/', {
  method: "POST",
  credentials: "include",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify(DotNeededData) 
})
.then(res => {          
res.json();
})
.then(data => {

  console.log(data);
  

  if(data === undefined) {
    Swal.fire({
      title: "Successfully SignUp",
      text: "Your Account is created in DocMeet",
      icon: "success",
      
    });
      
    }

})


  };
  return (
    <div className="min-h-scree flex justify-center items-center  py-5 overflow-hidden bg-[url('https://i.ibb.co/HFSH8Km/Hipster-Developer-Dice.jpg')] bg-cover ">
      <div className="w-[90%] md:w-[80%] lg:w-[80%] mx-auto">
        <form
          onSubmit={handleRegistration}
          className="w-[90%] md:w-[80%] lg:w-[80%] mx-auto p-5 border rounded-xl space-y-2"
        >
          {/* image */}
          <div className="flex gap-2">
            <div className="">
              <div className="relative border rounded-md h-28 w-28 md:h-28 md:w-28 mx-auto">
                {showDetails?.name ? (
                  <img
                    className="h-28 w-28 md:h-28 md:w-28 rounded-md mx-auto"
                    src={showImagePreview}
                    alt={showDetails?.name}
                  />
                ) : (
                  <img
                    className="h-28 w-28 md:h-28 md:w-28 border rounded-md mx-auto"
                    src="https://i.ibb.co/mtL872C/image.png"
                    alt=""
                  />
                )}
                <div className="absolute -bottom-2 right-0 border p-[2px] rounded-md back-bg text-xl md:text-3xl">
                  <label htmlFor="uploadImage" className="cursor-pointer">
                    <CiEdit />
                  </label>
                </div>
                <input
                  // name="photo"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const imageFile = e.target.files[0];
                      // console.log(imageFile);
                      setShowDetails(imageFile);
                      setShowImagePreview(URL.createObjectURL(imageFile));
                    }
                  }}
                  className="-z-0 absolute -top-[500px]"
                  id="uploadImage"
                  type="file"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold">
              Create a DevAssign account as a developer
            </h1>
          </div>
          {/* First name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">First Name</span>
            </label>
            <input
              className="h-[40px] border p-2 rounded-md focus:border-none"
              placeholder="First name"
              type="text"
              name="firstName"
              id=""
              required
            />
          </div>
          {/* Last name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">Last Name</span>
            </label>
            <input
              className="h-[40px] border p-2 rounded-md"
              placeholder="Last name"
              type="text"
              name="lastName"
              id=""
              required
            />
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">Email</span>
            </label>
            <input
              className="h-[40px] p-2 rounded-md border"
              placeholder=" Email Address"
              type="email"
              name="email"
              id=""
              required
            />
          </div>
          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">Phone Number</span>
            </label>
            <input
              className="h-[40px] p-2 rounded-md border"
              placeholder="Phone Number"
              type="number"
              name="phoneNumber"
              id=""
              required
            />
          </div>
          {/* date of Birth */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">Date of Birth</span>
            </label>
            <input
              className="h-[40px] p-2 rounded-md border"
              type="text"
              name="birthData"
              placeholder="Year-month-day"
              id=""
              required
            />
          </div>
          {/* Religion */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">Religion</span>
            </label>
            <input
              className="h-[40px] p-2 rounded-md border"
              placeholder="Religion"
              type="text"
              name="religion"
              id=""
              required
            />
          </div>
          {/* Address */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">Address</span>
            </label>
            <input
              className="h-[40px] p-2 rounded-md border"
              placeholder="Address"
              type="text"
              name="address"
              id=""
              required
            />
          </div>
          {/* Area */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">Area</span>
            </label>
            <input
              className="h-[40px] p-2 rounded-md border"
              placeholder="Area"
              type="text"
              name="area"
              id=""
              required
            />
          </div>
          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">Password</span>
            </label>
            <input
              className="h-[40px] p-2 rounded-md border"
              placeholder="Password"
              type="text"
              name="password"
              id=""
              required
            />
          </div>
          {/* Re-Enter Password */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-lg">
              <span className="">Re-Enter Password</span>
            </label>
            <input
              className="h-[40px] p-2 rounded-md border"
              placeholder="Confirm"
              type="text"
              name="reEnterPassword"
              id=""
              required
            />
          </div>
          {/* Gender */}
          <div className="flex items-start md:items-center gap-5">
            <label className="font-medium text-lg">
              <span htmlFor="" className="">
                Gender
              </span>
            </label>
            <div className="flex flex-wrap justify-center gap-5 text-center">
              {/* male */}
              <div className="flex flex-row-reverse items-center gap-2">
                <label htmlFor="male" className="font-medium text-lg">
                  Male
                </label>
                <input
                  onChange={() => setUserGender("male")}
                  checked={userGender === "male"}
                  className="h-10 cursor-pointer p-2 rounded-md"
                  placeholder="Gender"
                  type="radio"
                  name="gender"
                  id="male"
                  required
                />
              </div>
              {/* female */}
              <div className="text-xl flex flex-row-reverse items-center gap-2">
                <label htmlFor="female" className="font-medium text-lg">
                  Female
                </label>
                <input
                  onChange={() => setUserGender("female")}
                  checked={userGender === "female"}
                  className="h-6 cursor-pointer p-2 rounded-md"
                  placeholder="Gender"
                  type="radio"
                  name="gender"
                  id="female"
                />
              </div>
              {/* others */}
              <div className="text-xl flex flex-row-reverse items-center gap-2">
                <label htmlFor="others" className="font-medium text-lg">
                  Others
                </label>
                <input
                  onChange={() => setUserGender("others")}
                  checked={userGender === "others"}
                  className="h-6 cursor-pointer p-2 rounded-md"
                  placeholder="Gender"
                  type="radio"
                  name="gender"
                  id="others"
                />
              </div>
            </div>
          </div>
          {/* Marital Status */}
          <div className="flex items-start lg:items-center gap-5">
            <label className="font-medium text-lg text-nowrap">
              <span>Marital Status</span>
            </label>
            <div className="flex flex-wrap justify-center gap-5 text-center">
              {/* Married */}
              <div className="flex flex-row-reverse items-center gap-2">
                <label htmlFor="married" className="font-medium text-lg">
                  Married
                </label>
                <input
                  onChange={() => setUserMaritalStatus("married")}
                  checked={userMaritalStatus === "married"}
                  className="h-10 cursor-pointer p-2 rounded-md"
                  placeholder="Gender"
                  type="radio"
                  name="maritalStatus"
                  id="married"
                  required
                />
              </div>
              {/* Unmarried */}
              <div className="text-xl flex flex-row-reverse items-center gap-2">
                <label htmlFor="unmarried" className="font-medium text-lg">
                  Unmarried
                </label>
                <input
                  onChange={() => setUserMaritalStatus("unmarried")}
                  checked={userMaritalStatus === "unmarried"}
                  className="h-6 cursor-pointer p-2 rounded-md"
                  placeholder="Gender"
                  type="radio"
                  name="maritalStatus"
                  id="unmarried"
                />
              </div>
              {/* Engaged */}
              <div className="text-xl flex flex-row-reverse items-center gap-2">
                <label htmlFor="engaged" className="font-medium text-lg">
                  Engaged
                </label>
                <input
                  onChange={() => setUserMaritalStatus("engaged")}
                  checked={userMaritalStatus === "engaged"}
                  className="h-6 cursor-pointer p-2 rounded-md"
                  placeholder="Gender"
                  type="radio"
                  name="maritalStatus"
                  id="engaged"
                />
              </div>
              {/* Widowed */}
              <div className="text-xl flex flex-row-reverse items-center gap-2">
                <label htmlFor="widowed" className="font-medium text-lg">
                  Widowed
                </label>
                <input
                  onChange={() => setUserMaritalStatus("widowed")}
                  checked={userMaritalStatus === "widowed"}
                  className="h-6 cursor-pointer p-2 rounded-md"
                  placeholder="Gender"
                  type="radio"
                  name="maritalStatus"
                  id="widowed"
                />
              </div>
              {/* Divorced */}
              <div className="text-xl flex flex-row-reverse items-center gap-2">
                <label htmlFor="divorced" className="font-medium text-lg">
                  Divorced
                </label>
                <input
                  onChange={() => setUserMaritalStatus("divorced")}
                  checked={userMaritalStatus === "divorced"}
                  className="h-6 cursor-pointer p-2 rounded-md"
                  placeholder="Gender"
                  type="radio"
                  name="maritalStatus"
                  id="divorced"
                />
              </div>
            </div>
          </div>

          <button
            className="text-start px-3 py-2 border rounded-md bg-blue-500 font-bold text-white hover:bg-slate-600"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegistrationPage;




//  const DotNeededData = {
//   phone_number: userPhoneNumber,
//   email: userEmail,
//   first_name: userFirstName,
//   last_name: userLastName,
//   gender: userGender,
//   religion: userReligion,
//   date_of_birth: userBirthData,
//   area: userArea,
//   address: userPassword,
//   marital_status: userMaritalStatus,
//   profile_picture:
//     "https//th.bing.com/th/id/OIP.VyqEYMsU2XuSVnrtW6nqAAHaE8?rs=1&pid=ImgDetMain",
//   password: userReEnterPassword,
// };
