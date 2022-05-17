import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCollections = createAsyncThunk(
  "collection/fetchAllCollections",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data: collections },
      } = await axios.get("/api/collections");
      return collections;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCollection = createAsyncThunk(
  "collection/fetchCollection",
  async (slug, { rejectWithValue }) => {
    try {
      const {
        data: { data: collection },
      } = await axios.get(`/api/collections/${slug}`);
      return collection;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const collectionInitState = {
  collections: [],
  singleCollection: {},
  status: "",
};

const collectionSlice = createSlice({
  name: "collection",
  initialState: collectionInitState,
  reducers: {},
  extraReducers: {
    [fetchAllCollections.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllCollections.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.collections = payload;
    },
    [fetchAllCollections.rejected]: (state) => {
      state.status = "error";
    },
    [fetchCollection.pending]: (state) => {
      state.status = "loading";
    },
    [fetchCollection.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.singleCollection = payload;
    },
    [fetchCollection.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default collectionSlice.reducer;
