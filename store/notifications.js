import axios from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  globalNotifications: [],
  status: null,
  error: null
}

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (user) => {
    try {
      const {data: notifications} = await axios.get('/api/notifications/', user)
      return notifications
    } catch (err) {
      console.log(err)
    }
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotifications.pending]: (state) => {
      state.status = "loading";
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload;
      state.status = "success";
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  }
})

export const notificationsReducer = notificationsSlice.reducer
