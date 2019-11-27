import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

// A bunch of middleware, all because we want to get the layout state when
// getting the panelItem. *shakes fist at world*

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
