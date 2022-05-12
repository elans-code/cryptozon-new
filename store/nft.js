// import axios from "axios";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//   nft: [],
// }

// export const fetchNFT = createAsyncThunk();

// export const nftSlice = createSlice({
//   name: "nft",
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [fetchNFT.pending]: (state) => {
//       state.status = "loading";
//   },
//   [fetchNFT.fulfilled]: (state, action) => {
//     state.nft = action.payload;
//     state.status = "success";
//   },
//   [fetchNFT.rejected]: (state, action) => {
//     state.status = "rejected";
//     state.error = action.payload;
//   }
//   },
// });

// export const nftReducer = nftSlice.reducer;
