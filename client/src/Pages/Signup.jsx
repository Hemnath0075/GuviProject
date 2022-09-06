import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ReactTyped from 'react-typed';
import { signupUser, verifyToken } from '../redux/features/user';

function Signup() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username:"",
        email: "",
        password: "",
      });
      const { username,email, password } = user;
      const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
      const onSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser(user));
        navigate('/login');
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
            <Link to="/"><h1 className="flex items-center text-4xl font-bold font-serif text-black w-screen h-16 bg-white pl-4">
              GUVI
            </h1></Link>
            <div className="h-screen flex justify-center flex-col items-center">
              <h1 className="text-7xl font-mono text-white font-bold">
                <ReactTyped
                  strings={["Learn:)", "Live to Code", "Share Your Knowledge.."]}
                  typeSpeed={100}
                  backSpeed={50}
                />
              </h1>
              <button className="px-20 mt-80 py-2 bg-teal-500 w-auto h-auto rounded">
                <Link to="/login"><h1 className="text-2xl font-bold text-white">Login</h1></Link>
              </button>
            </div>
          </div>
          <div className="form-layout w-screen bg-white h-96 flex flex-col gap-10">
            <h1 className="flex items-center justify-center text-4xl font-bold font-serif text-white w-screen h-16 bg-black pl-4">
              Register Into GUVI
            </h1>
            <form>
              <div className="relative w-9/12 ml-auto mr-auto mb-3">
                <input
                  type="username"
                  name="username"
                  className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
                  placeholder="Username"
                  value={username}
                  onChange={onChange}
                  required
                />
              </div>
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
            </form>
          </div>
        </>
      );
}

export default Signup