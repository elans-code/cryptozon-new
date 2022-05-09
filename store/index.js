import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./post";
// import { userReducer } from "./profile";

const reducer = {
  // user: userReducer,
  socialPost: postReducer,
};

const store = configureStore({ reducer });

export default store;
