import excelReducer from './reducer/excelDataReducer';

const combineReducers =
  (reducers) =>
  (state = {}, action) => {
    const combinedState = {};
    for (const key in reducers) {
      combinedState[key] = reducers[key](state[key], action);
    }
    return combinedState;
  };

const mainReducer = combineReducers({
  excel: excelReducer,
});

export default mainReducer;
