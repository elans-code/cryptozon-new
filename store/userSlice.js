import axios from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  user: {},
  status: null,
  error: null
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (wallet) => {
    try {
      // pass in the wallet to get the user associated to that wallet
      const {data: user} = await axios.get('/api/profile', {params: {wallet}})
      // const {data: user} = await axios.get('/api/profile', wallet)
      return user
    } catch (err) {
      console.log(err)
    }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    }
  }
})

export const userReducer = userSlice.reducer;
