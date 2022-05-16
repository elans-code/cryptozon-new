import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./post";
import { userReducer } from "./userSlice";
import { nftReducer } from "./nfts";
import { followersReducer } from "./followers";
import { followingReducer } from "./following";
import { selectedUserReducer } from "./selectedUser";
import collectionReducer from "./collections";

const reducer = {
  user: userReducer,
  socialPost: postReducer,
  followers: followersReducer,
  following: followingReducer,
  selectedUser: selectedUserReducer,
  nfts: nftReducer,
  collection: collectionReducer,
};

const store = configureStore({ reducer });

export default store;
