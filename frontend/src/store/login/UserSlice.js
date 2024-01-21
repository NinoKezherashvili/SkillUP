import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:8000/api/user/login/";

export const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  try {
    const response = await axios.post(`${apiUrl}`, data, {
      withCredentials: true,
    });
    console.log(response);
    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error("Login failed");
  }
});

const initialState = {
  loading: false,
  user: null,
  error: null,
  sessionId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = "Username or password is incorrect";
      });
  },
});

export default userSlice.reducer;
