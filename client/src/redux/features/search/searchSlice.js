// src/redux/features/search/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  filters: {},
  results: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
      state.filters = {};
      state.results = [];
    },
  },
});

export const { setSearchQuery, setFilters, setResults, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
