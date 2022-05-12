import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./post";
import { userReducer } from "./userSlice";
// import { nftReducer } from "./nftSlice";

const reducer = {
  user: userReducer,
  socialPost: postReducer,
  // nft: nftReducer,

};

const store = configureStore({ reducer });

export default store;
