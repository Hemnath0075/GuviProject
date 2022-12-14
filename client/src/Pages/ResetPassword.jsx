import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword, verifyToken } from "../redux/features/user";
import 'react-toastify/dist/ReactToastify.css';
import {toast,ToastContainer} from 'react-toastify';

toast.configure();

function ResetPassword() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [user, setUser] = useState({
    password: "",
  });
  const { password } = user;
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(user)).then((value)=>{
      console.log(value.meta.requestStatus)
      if(value.meta.requestStatus==="fulfilled"){
        console.log("success")
        toast.success('Password Changed Successfully', {
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
      };
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
        <Link to="/"><h1 className="flex items-center text-4xl font-bold font-serif text-white w-screen h-16 bg-black pl-4">
          GUVI
        </h1></Link>
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="h-auto w-auto p-4 basis-4/5 bg-opacity-20 backdrop-blur-sm drop-shadow-lg rounded bg-black">
            <h1 className=" flex justify-center items-center text-4xl font-bold font-serif text-white h-16 bg-black">
              Reset Password
            </h1>
            <form onSubmit={onSubmit} className="p-4">
              <div className="relative w-9/12 ml-auto mr-auto mb-3">
                <label htmlFor="email" className="text-white font-bold">
                  Enter Your New Password
                </label>
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
                  className="cursor-pointer bg-blue text-white hover:bg-opacity-90 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
