import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReactTyped from "react-typed";
import { loginUser, verifyToken } from "../redux/features/user";
import 'react-toastify/dist/ReactToastify.css';
import {toast,ToastContainer} from 'react-toastify';

toast.configure();


function Login() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit =(e) => {
    e.preventDefault();
    dispatch(loginUser(user)).then((value)=>{
        console.log(value.meta.requestStatus)
        if(value.meta.requestStatus==="fulfilled"){
          console.log("success")
          toast.success('Login Successfull', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          navigate('/home');
        }
        else{
          toast.error(value.payload.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
        
        // <ToastContainer/>
    })
  };
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token)
     dispatch(verifyToken()).then((value)=>{
      if(value.meta.requestStatus==="fulfilled")
        navigate('/home');
     })
  },[])
  return (
    <>
      <div className="bg-white h-screen w-screen main-layout">
        <Link to="/">
          <h1 className="fixed flex items-center text-4xl font-bold font-serif text-black w-screen h-16 bg-white pl-4">
            GUVI
          </h1>
        </Link>
        <div className="h-screen flex justify-center flex-col items-center">
          <h1 className="text-7xl font-mono font-bold text-white">
            <ReactTyped
              strings={["Learn:)", "Code", "Share.."]}
              typeSpeed={100}
              backSpeed={50}
            />
          </h1>
          <button className="mt-80  w-auto h-auto rounded flex flex-row gap-8">
            <Link to="/login">
              <h1 className="px-20 py-2 bg-teal-500 text-2xl font-bold text-white">
                Login
              </h1>
            </Link>
            <Link to="/signup">
              <h1 className="px-20 py-2 bg-teal-500 text-2xl font-bold text-white">
                Signup
              </h1>
            </Link>
          </button>
        </div>
      </div>
      <div className="form-layout w-screen bg-white h-96 flex flex-col gap-10">
        <h1 className="flex items-center justify-center text-4xl font-bold font-serif text-white w-screen h-16 bg-black pl-4">
          Log Into GUVI
        </h1>
        <form >
          <div className="relative w-9/12 ml-auto mr-auto mb-3">
            <input
              type="email"
              name="email"
              className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
              placeholder="Email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="relative w-9/12 ml-auto mr-auto mb-3">
            <input
              type="password"
              name="password"
              className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
              placeholder="Password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="text-center m-auto bg-black w-9/12 mt-6">
            <input
              type="submit"
              name="login"
              id="login"
              value="Submit"
              onClick={onSubmit}
              className="cursor-pointer bg-blue text-white hover:bg-opacity-90 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:bg-opacity-90"
            />
          </div>
          <Link to="/forgotpassword">
            <div className="text-center m-auto bg-black w-9/12 mt-6 text-white font-bold p-2">
              <button>Forgot Password</button>
            </div>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
