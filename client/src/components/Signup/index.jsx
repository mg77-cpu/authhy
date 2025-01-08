import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import send from "../images/send.gif";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_URL;


const Signup = () => {
  const [data, setData] = useState({
    userName: "",
    password: "",
    tradeName: "",
    email: "",
    regNum: "",
    phone: "",
    address: "",
    website: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const validateInput = () => {
    const { userName, password, tradeName, email, regNum, phone, address, website } = data;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	  const phoneRegex = /^[\d\s+()-]{10,}$/;

    if (!userName) {
      toast.error("User Name is required", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (!tradeName) {
      toast.error("Trade Name is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (!email || !emailRegex.test(email)) {
      toast.error("Valid Email is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (!regNum) {
      toast.error("Registration Number is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (!phone || !phoneRegex.test(phone)) {
      toast.error("Valid Phone Number is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (!address) {
      toast.error("Address is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (!website) {
      toast.error("Website is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    try {
      const url = `${apiUrl}/api/users`;
      const { data: res } = await axios.post(url, data);
      await axios.post(`${apiUrl}/api/companyCount/companies/increment`);
      console.log(res.message);
	    toast.success('Signed up successfully, yay!', {
					  position: "top-right",
					  autoClose: 5000,
					  hideProgressBar: false,
					  closeOnClick: true,
					  pauseOnHover: true,
					  draggable: true,
					  progress: undefined,
					  theme: "colored",
					});
          setTimeout(() => {
            navigate("/login"); 
          }, 4000);

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };


return (
<div className="flex w-full h-screen justify-center items-center relative "
    
    >
   <form className="p-3 flex flex-initial justify-center items-center rounded-xl h-2/3 w-96 sm:w-1/2 my-5 eth-card-m white-glassmorphism absolute top-14 left-80"
   type="submit"
   onSubmit={handleSubmit}
   >

      <div className="w-12 h-12 rounded-full  flex justify-center items-center absolute top-10 left-10">
			<img
				src={send}  
				alt="img"
				className="rounded-full" 
				 fontSize={40} 
			/>
		</div>
      <div className="justify-start flex-col  w-60 h-40 absolute left-10 top-32 white-glassmorphism">
		<h1 className="px-6 py-5">Already have an account?</h1>
		<Link to="/login">
	<button 
	className="absolute top-28 right-24 white-glassmor h-8 w-16 hover:bg-cyan-200">
		Sign in
		</button>
		</Link>
		</div>

		<div className="px-10 py-10 h-auto w-1/2 flex-col justify-center text-black-500 absolute right-10 items-center white-glassmorphism" 
		>
		<h1 className="absolute left-32 top-4">
		Create Account
		</h1>
		<input
		type="text"
		placeholder="User Name"
		name="userName"
		onChange={handleChange}
		value={data.userName}
		className="my-1 w-full rounded-sm p-2 outline-none bg-transparent border-none text-black blue-glassmorphism"
		/>
		<input
		type="text"
		placeholder="TradeName"
		name="tradeName"
		onChange={handleChange}
		value={data.tradeName}
		className="my-1 w-full rounded-sm p-2 outline-none bg-transparent text-black-500 border-none text-sm blue-glassmorphism"
		/>
		<input
		type="email"
		placeholder="Email"
		name="email"
		onChange={handleChange}
		value={data.email}
		className="my-1 w-full rounded-sm p-2 outline-none bg-transparent border-none text-sm blue-glassmorphism"
		/>
		<input
		type="password"
		placeholder="Password"
		name="password"
		onChange={handleChange}
		value={data.password}
		className="my-1 w-full rounded-sm p-2 outline-none bg-transparent text-black-500 border-none text-sm blue-glassmorphism"
		/>
		<input
		type="text"
		placeholder="Registration Number"
		name="regNum"
		onChange={handleChange}
		value={data.regNum}
		
		className="my-1 w-full rounded-sm p-2 outline-none bg-transparent text-black-500 border-none text-sm blue-glassmorphism"
		/>
		<input
		type="text"
		placeholder="Phone Number"
		name="phone"
		onChange={handleChange}
		value={data.phone}
		
		className="my-1 w-full rounded-sm p-2 outline-none bg-transparent border-none text-sm blue-glassmorphism"
		/>
		<input
		type="text"
		placeholder="Address"
		name="address"
		onChange={handleChange}
		value={data.address}
		
		className="my-1 w-full rounded-sm p-2 outline-none bg-transparent border-none text-sm blue-glassmorphism"
		/>
		<input
		type="text"
		placeholder="website"
		name="website"
		onChange={handleChange}
		value={data.website}

		className="my-1 w-full rounded-sm p-2 outline-none bg-transparent text-black-500 border-none text-sm blue-glassmorphism"
		/>
		<button type="submit"
		className="absolute left-40 bottom-1 white-glassmorphism h-8 w-20 hover:bg-cyan-200">
		 Sign Up
		</button>
		</div>
  </form>
	<ToastContainer />
</div>
	);
	
};
export default Signup;
