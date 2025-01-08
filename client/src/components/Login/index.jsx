import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import gif4 from "../images/gif4.gif";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;


const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    toast.info("Note that for you to add some products you need to create an accoun first.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }, [navigate]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const validateInput = () => {
    const { email, password } = data;
    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      toast.error("Email is required", {
        position: "bottom-right",
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

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", {
        position: "bottom-right",
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

    if (!password) {
      toast.error("Password is required", {
        position: "bottom-right",
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

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "bottom-right",
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
      const url = `${apiUrl}/api/auth`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      toast.success('Signed in successfully, yay!', {
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
                  navigate("/"); 
                }, 3000);
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
    <div className="flex w-full h-screen justify-center items-center relative">
      <div className="p-3 flex flex-initial justify-center items-center rounded-xl h-2/3 w-96 sm:w-1/2 my-5 eth-card-m white-glassmorphism absolute top-14 left-80">
        <div className="w-12 h-12 rounded-full flex justify-center items-center absolute top-10 left-10">
          <img
            src={gif4}
            alt="img"
            className="rounded-full"
            fontSize={40}
          />
        </div>
        <div className="justify-start flex-col w-60 h-40 absolute left-10 top-32 white-glassmorphism">
          <h1 className="px-20 py-5 text-md">New Here?</h1>
          <Link to="/signup">
            <button
              type="button"
              className="absolute top-28 right-24 white-glassmor h-8 w-16 hover:bg-cyan-200"
            >
              Sign Up
            </button>
          </Link>
        </div>
        <div className="px-10 py-10 h-3/4 w-1/2 flex-col justify-center text-black-500 absolute right-10 items-center white-glassmorphism">
          <h1
            className="absolute left-28 top-4">
            Login to Your Account
          </h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="my-1 w-80 rounded-sm p-2 outline-none bg-transparent border-none text-black blue-glassmorphism absolute top-20 left-8"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="my-1 w-80 rounded-sm p-2 outline-none bg-transparent border-none text-black blue-glassmorphism absolute top-36 left-8"
          />
          {error && <div
            className="my-1 w-full rounded-sm p-2 outline-none bg-transparent border-none text-black blue-glassmorphism">
            {error}</div>}
          <button
            type="submit"
            onClick={handleSubmit}
            className="absolute left-40 bottom-5 white-glassmor h-8 w-20 hover:bg-cyan-200">
            Sign In
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
