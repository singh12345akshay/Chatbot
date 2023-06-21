import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isSidebarOpen: boolean
}

const initialState: AppState = {
  isSidebarOpen: false
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    }
    },
  },
);
export const { toggleSidebar} =
  appSlice.actions;
const store = configureStore({ reducer: appSlice.reducer});

export default store;
