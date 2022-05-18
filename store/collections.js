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
  reducers: {
    changeNFTListing(
      state,
      { payload: { id, listingId, expirationDate, buyoutPrice } }
    ) {
      const index = state.singleCollection.nfts.findIndex((el) => el.id === id);
      state.singleCollection.nfts[index].listingId = listingId;
      state.singleCollection.nfts[index].expirationDate = expirationDate;
      state.singleCollection.nfts[index].buyoutPrice = buyoutPrice;
    },
    changeNFTOwner(state, { payload: { id, wallet } }) {
      const index = state.singleCollection.nfts.findIndex((el) => el.id === id);
      state.singleCollection.nfts[index].owner = wallet;
      state.singleCollection.nfts[index].listingId = null;
      state.singleCollection.nfts[index].expirationDate = null;
      state.singleCollection.nfts[index].buyoutPrice = null;
    },
  },
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

export const collectionActions = collectionSlice.actions;

export default collectionSlice.reducer;
