import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./post";
import { userReducer } from "./userSlice";
// import { nftReducer } from "./nftSlice";
import { followersReducer } from "./followers";

const reducer = {
  user: userReducer,
  socialPost: postReducer,
  // nft: nftReducer,
  followers: followersReducer
};

const store = configureStore({ reducer });

export default store;
