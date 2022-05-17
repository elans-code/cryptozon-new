import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useAddress, useMarketplace } from "@thirdweb-dev/react";


const initialState = {
  nfts: [],
  status: null,
  error: null
}


export const setNFT = createAsyncThunk(
  "nfts/setNFT",
  async (data) => {
    try {
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const nftSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {},
  extraReducers: {
    [setNFT.pending]: (state) => {
      state.status = "loading";
    },
    [setNFT.fulfilled]: (state, action) => {
      state.nfts = [...state.nfts, action.payload];
      state.status = "success";
    },
    [setNFT.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    }
  },
});

export const nftReducer = nftSlice.reducer;
