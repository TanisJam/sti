import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
    members: [],
    alignment: {
      good: 0,
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
    setTimeout(() => {
      dispatch(alertDismissed());
    }, 2000);
    dispatch(alertTrigered({ message, type }));
  };
export const updateStats = () => (dispatch, getState) => {
  const state = getState();
  const heroes = state.heroes.team.members;
  const initialStats = initialState.team.stats;
  let stats = heroes.reduce((team, hero) => {
    const heroStats = hero.powerstats;
    let actual = {};
    for (const key in team) {
      let normalizedHerostat =
        heroStats[key] === "null" ? 0 : parseInt(heroStats[key]);
      actual[key] = parseInt(team[key]) + normalizedHerostat;
    }
    return actual;
  }, initialStats);

  dispatch(updatedStats(stats));
};
export const addHero = (hero) => (dispatch, getState) => {
  const state = getState();
  const members = state.heroes.team.members;
  const teamAlignment = state.heroes.team.alignment;
  const id = hero.id;
  const heroAlignment = hero.biography.alignment === "good" ? "good" : "bad";
  const isInTeam = members.find((member) => member.id === id);
  if (isInTeam) {
    dispatch(
      showAlert({
        message: "Hero is already in the team.",
        type: "danger",
      })
    );
    return;
  } else if (teamAlignment[heroAlignment] >= 3) {
    dispatch(
      showAlert({
        message: `No more than 3 ${heroAlignment} heroes are allowed.`,
        type: "danger",
      })
    );
    return;
  }
  dispatch(
    showAlert({
      message: "The hero has been successfully added.",
      type: "success",
    })
  );
  dispatch(addedHero({ hero, heroAlignment }));
  dispatch(updateStats());
};
export const removeHero = (hero) => (dispatch) => {
  dispatch(removedHero(hero));
  dispatch(updateStats());
};

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    addedHero: (state, action) => {
      const heroAlignment = action.payload.heroAlignment;
      state.team.members.push(action.payload.hero);
      state.team.alignment[heroAlignment]++;
    },
    removedHero: (state, action) => {
      const heroAlignment = action.payload.biography.alignment;
      const heroId = action.payload.id;
      state.team.members = state.team.members.filter(
        (hero) => hero.id !== heroId
      );
      state.team.alignment[heroAlignment]--;
    },
    updatedStats: (state, action) => {
      state.team.stats = action.payload;
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

export const {
  addedHero,
  removedHero,
  updatedStats,
  alertTrigered,
  alertDismissed,
} = heroesSlice.actions;

export default heroesSlice.reducer;
