import { compose, createStore, combineReducers } from "redux";

import form from "./form/form.reducer";

const rootReducer = combineReducers({ form });

const store = createStore(
  rootReducer,
  undefined,
  compose(window.devToolsExtension ? window.devToolsExtension() : (f) => f)
);

// store.dispatch(initialize());

export default store;
