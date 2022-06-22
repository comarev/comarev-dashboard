import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
  );

export default store;
