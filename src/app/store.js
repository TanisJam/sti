import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "../features/heroes/heroSlice";
import userSlice from "../features/login/userSlice";

export const store = configureStore({
  reducer: {
    heroes: heroSlice,
    user: userSlice,
  },
});
