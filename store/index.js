import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./post";
import { userReducer } from "./userSlice";
// import { nftReducer } from "./nftSlice";
import { followersReducer } from "./followers";
import { followingReducer } from "./following";
import { selectedUserReducer } from "./selectedUser";

const reducer = {
  user: userReducer,
  socialPost: postReducer,
  // nft: nftReducer,
  followers: followersReducer,
  following: followingReducer,
  selectedUser: selectedUserReducer
};

const store = configureStore({ reducer });

export default store;
