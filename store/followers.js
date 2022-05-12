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
      const {data: followers} = axios.get(`/api/user/followers`)
      return followers
    } catch(err) {
      console.log(err)
    }
  }
)

export const followUser = createAsyncThunk(
  'followers/followUser',
  async (info) => {
    const {wallet, username} = info;
    console.log('wallet is', wallet)
    console.log('username is', username)
    try {
      const {data} = axios.post('/api/user/followers', {params: {wallet, username}})
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
      state.user = action.payload;
      state.status = "success";
    },
    [fetchFollowers.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [followUser.pending]: (state) => {
      state.status = "loading";
    },
    [followUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    [followUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  }
})

export const followersReducer = followersSlice.reducer
