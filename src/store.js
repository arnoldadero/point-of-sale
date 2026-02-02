import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import reducers from "./reducers";

const persistedState = sessionStorage.getItem("appstate")
  ? JSON.parse(sessionStorage.getItem("appstate"))
  : undefined;

const store = configureStore({
  reducer: reducers,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false, // For legacy compatibility with existing state
    });
    if (import.meta.env.MODE !== "production") {
      middleware.push(createLogger());
    }
    return middleware;
  },
});

store.subscribe(() => {
  sessionStorage.setItem("appstate", JSON.stringify(store.getState()));
});

export default store;

/*
window.addEventListener('storage',function(e){
   if(e.storageArea===sessionStorage){
     alert('change');
   } 
   // else, event is caused by an update to localStorage, ignore it
});
*/
