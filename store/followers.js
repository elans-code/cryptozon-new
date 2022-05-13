import axios from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  followers: [],
  status: null,
  error: null
}

export const fetchFollowers = createAsyncThunk(
  'followers/fetchFollowers',
  async (username) => {
    try {
      const {data} = await axios.get(`/api/user/followers`, {params: {username}})
      return data
    } catch(err) {
      console.log(err)
    }
  }
)

export const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFollowers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchFollowers.fulfilled]: (state, action) => {
      state.followers = action.payload;
      state.status = "success";
    },
    [fetchFollowers.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  }
})

export const followersReducer = followersSlice.reducer
