import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showAlert } from "../heroes/heroSlice";

const LOGIN_URL = "http://challenge-react.alkemy.org";
const LOGIN_URL_PROXY = "https://node-api-proxy-alkemy.herokuapp.com/";

const user = localStorage.getItem("USER_TOKEN");

const initialState = {
  status: "idle",
  error: "",
  token: user || "",
};

export const logIn = createAsyncThunk(
  "user/logIn",
  async (data, { dispatch }) => {
    try {
      const response = await axios.post(LOGIN_URL_PROXY, {
        email: data.email,
        password: data.password,
      });

      const respData = response.data;
      localStorage.setItem("USER_TOKEN", respData.token);
      dispatch(
        showAlert({
          message: `Login successfully`,
          type: "success",
        })
      );
      return respData;
    } catch ({ response }) {
      dispatch(
        showAlert({
          message: `Login failed:  ${response.data.error}`,
          type: "danger",
        })
      );
      throw response;
    }
  }
);

export const logOut = () => (dispatch) => {
  localStorage.removeItem("USER_TOKEN");
  dispatch(loggedOut());
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedOut: (state) => {
      state = {
        status: "idle",
        error: "",
        token: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.token = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Error while login";
      });
  },
});

export const selectToken = (state) => state.user.token;

export const { loggedOut } = userSlice.actions;

export default userSlice.reducer;
