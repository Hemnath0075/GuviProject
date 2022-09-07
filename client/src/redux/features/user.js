import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: token,
  },
};
export const verifyToken = createAsyncThunk("user/verifyToken", async () => {
  const res = await axios.get("http://localhost:7000/verifytoken", config);
  return res.data;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:7000/update",
        data,
        config
      );
      return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:7000/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:7000/signup", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:7000/signup", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:7000/resetpassword", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const isUserLoggedIn = createAsyncThunk(
  "user/isUserLoggedIn",
  async (data) => {
    const res = await axios.post("http://localhost:7000/auth/", data);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    status: false,
    newuser: null,
    error: {},
  },
  reducers: {
    logout(state, action) {
      state.status = false;
      state.user = {};
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.status = true;
      state.user = action.payload;
      localStorage.setItem("user", action.payload._id);
      localStorage.setItem("token", action.payload.token);
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = false;
    },
    [verifyToken.fulfilled]: (state, action) => {
      state.status = true;
      state.user = action.payload.user;
    },
    [verifyToken.rejected]: (state, action) => {
      state.status = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [updateUser.rejected]: (state, action) => {
      state.status = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.newuser = "false";
    },
    [isUserLoggedIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.newuser = "true";
      state.status = true;
    },
  },
});

export const GetUser = (state) => state.user;
export const { logout } = userSlice.actions;
// console.log(GetUser);
export const UserStatus = (state) => state.status;
// console.log(UserStatus);

export default userSlice.reducer;
