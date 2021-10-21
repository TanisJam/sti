import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dataTest from "./heroTest.json";

const ACCESS_TOKEN = "10159582774652838";

const initialState = {
  results: [],
  status: "idle",
  alert: {
    message: "",
    type: "",
    show: false,
  },
  error: "",
  team: {
    members: dataTest.test,
    alignment: {
      good: 2,
      bad: 0,
    },
    stats: {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0,
    },
  },
};

export const searchHeroes = createAsyncThunk(
  "heroes/searchHeroes",
  async (name) => {
    const response = await axios({
      method: "get",
      url: `/api/${ACCESS_TOKEN}/search/${name}`,
      data: {},
    });
    const data = response.data;
    return data;
  }
);

export const showAlert =
  ({ message, type }) =>
  (dispatch) => {
    console.log("entra");
    dispatch(alertTrigered({ message, type }));
    setTimeout(() => {
      dispatch(alertDismissed());
    }, 2000);
  };
export const addHero = (hero) => (dispatch, getState) => {
  const state = getState();
  const members = state.heroes.team.members;
  const teamAlignment = state.heroes.team.alignment;
  const id = hero.id;
  const heroAlignment = hero.biography.alignment;
  const isInTeam = members.find((member) => member.id === id);

  if (isInTeam) {
    dispatch(
      showAlert({
        message: "Hero is already in the team.",
        type: "danger",
      })
    );
    return;
  } else {
    if (teamAlignment[heroAlignment] > 3) {
      dispatch(
        showAlert({
          message: `No more than 3 ${heroAlignment} heroes are allowed.`,
          type: "danger",
        })
      );
      return;
    }
  }
  dispatch(
    showAlert({
      message: "The hero has been successfully added.",
      type: "success",
    })
  );
  
  dispatch(addedHero(hero));
};

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    addedHero: (state, action) => {
      const heroAlignment = action.payload.biography.alignment;
      state.team.members.push(action.payload);
      state.team.alignment[heroAlignment]++;
    },
    alertTrigered: (state, action) => {
      state.alert = { ...action.payload, show: true };
    },
    alertDismissed: (state) => {
      state.alert.show = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchHeroes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchHeroes.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.status = "failed";
          state.error = action.payload.error;
        } else {
          state.status = "succeeded";
          state.results = action.payload.results;
        }
      })
      .addCase(searchHeroes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action;
      });
  },
});

export const selectTeamMembers = (state) => state.heroes.team.members;
export const selectTeamStats = (state) => state.heroes.team.stats;
export const selectSearchResults = (state) => state.heroes.results;
export const selectAlert = (state) => state.heroes.alert;

export const { addedHero, alertTrigered, alertDismissed } = heroesSlice.actions;

export default heroesSlice.reducer;
