import { configureStore } from "@reduxjs/toolkit";
import { scheduleApi } from "./API/schedules.api.slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./API/auth.api.slice";
import { roomApiSlice } from "./API/rooms.api.slice";
import { taskApiSlice } from "./API/tasks.api.slice";
import { usersApiSlice } from "./API/users.api.slice";
import { userSlice } from "./slices/userSlice";
import roomReducer from "./slices/roomSlice";

export const store = configureStore({
  reducer: {
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [roomApiSlice.reducerPath]: roomApiSlice.reducer,
    [taskApiSlice.reducerPath]: taskApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    user: userSlice.reducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      usersApiSlice.middleware,
      roomApiSlice.middleware,
      taskApiSlice.middleware,
      usersApiSlice.middleware,
      scheduleApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
