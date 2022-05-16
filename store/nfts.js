import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAddress, useMarketplace } from "@thirdweb-dev/react";


const initialState = {
  nfts: [],
}

export const fetchNFT = createAsyncThunk(
  "nfts/fetchNFT",
  async () => {
    try {
      const marketplace = useMarketplace(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS);
      const { data:nfts } = await marketplace.getAllListings();
      console.log(nfts)
      return nfts;
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
    [fetchNFT.pending]: (state) => {
      state.status = "loading";
  },
  [fetchNFT.fulfilled]: (state, action) => {
    state.nfts = action.payload;
    state.status = "success";
  },
  [fetchNFT.rejected]: (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
  }
  },
});

export const nftReducer = nftSlice.reducer;
