import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./profile";

const reducer = {
  user: userReducer
}

const store = configureStore({reducer});

export default store
