import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUser, logout, updateUser, verifyToken } from "../redux/features/user";
import Avatar from "../assets/user.png";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function Home() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const isAuth = useSelector((state) => state.users.status);
  console.log(isAuth);
  const User=useSelector((state) => state.users.user);
  console.log(User);
  const [user, setUser] = useState({
    username: User.username,
    dob: User.dob,
    address:User.address,
    state: User.state,
    country: User.country,
    pincode: User.pincode,
  });
  const { username, dob, address, state, country, pincode } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user));
    // dispatch(signupUser(user));
  };
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token)
     dispatch(verifyToken()).then((data)=>{
      console.log(data);
     })
  },[])
  const Logout = () => {
    localStorage.clear();
    dispatch(logout());
  };
  return (
    <Fragment>
      <div className="w-screen min-h-screen">
        <div className="flex justify-between items-center text-4xl font-bold font-serif text-white w-screen h-16 bg-black pl-4">
          <h1>GUVI</h1>
          <button onClick={Logout}>Logout</button>
        </div>
        <div className="mt-20 bg-blue-50">
          <div className="">
            <button
              className="p-2 px-2 text-xl bg-white m-8"
              onClick={handleOpen}
              variant="gradient"
            >
              Update
            </button>
          </div>
          <div className="card-container p-12 h-auto bg-blue-50 flex flex-col-reverse md:flex-row">
            <div className="card-details md:p-20 p-12 w-full md:w-2/4 bg-blue-700 rounded-b-2xl md:rounded-l-2xl md:rounded-br-none">
              <div className="text-white text-lg flex flex-col gap-8">
                <p></p>
                <p>
                  UserName:<h1 className="ml-12 text-lg inline">{User.username}</h1>
                </p>
                <p>
                  DOB:<h1 className="ml-12 text-lg inline">{User.dob}</h1>
                </p>
                <p>
                  Address:<h1 className="ml-12 text-lg inline">{User.address}</h1>
                </p>
                <p>
                  State:<h1 className="ml-12 text-lg inline">{User.state}</h1>
                </p>
                <p>
                  Cuntry:<h1 className="ml-12 text-lg inline">{User.country}</h1>
                </p>
                <p>
                  Pincode:<h1 className="ml-12 text-lg inline">{User.pincode}</h1>
                </p>
              </div>
            </div>
            <div className="card-image md:p-20 p-12 w-full md:w-2/4 bg-blue-700 rounded-t-2xl md:rounded-r-xl md:rounded-tl-none md:rounded-bl-none ">
              <img src={Avatar} alt="" className="h-40 md:h-80 ml-8 " />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Update Your Details Here</DialogHeader>
        <DialogBody divider>
          <div className="form-wrapper w-full">
            <form>
              <div className="relative w-full ml-auto mr-auto mb-3">
                <input
                  type="text"
                  name="username"
                  className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
                  placeholder="Username"
                  value={username}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="relative w-full ml-auto mr-auto mb-3">
                <input
                  type="date"
                  name="dob"
                  className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
                  placeholder="dob"
                  value={dob}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="relative w-full ml-auto mr-auto mb-3">
                <input
                  type="text"
                  name="address"
                  className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
                  placeholder="address"
                  value={address}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="relative w-full ml-auto mr-auto mb-3">
                <input
                  type="text"
                  name="state"
                  className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
                  placeholder="state"
                  value={state}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="relative w-full ml-auto mr-auto mb-3">
                <input
                  type="text"
                  name="country"
                  className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
                  placeholder="country"
                  value={country}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="relative w-full ml-auto mr-auto mb-3">
                <input
                  type="phoneNumber"
                  name="pincode"
                  className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
                  placeholder="pincode"
                  value={pincode}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="text-center m-auto bg-black w-9/12 mt-6">
                <input
                  type="submit"
                  name="login"
                  id="login"
                  value="Update Changes"
                  onClick={onSubmit}
                  className="cursor-pointer bg-blue text-white hover:bg-opacity-90 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default Home;
