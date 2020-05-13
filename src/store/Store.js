import React, { createContext, useReducer } from 'react';
import Reducer from './Reducer';

import scripts from '../../scripts.json';

const initialState = {
  windows: [],
  scripts,
  documents: [],
  showSearch: false,
  render: false
};

// eslint-disable-next-line react/prop-types
const Store = ({ children }) => {
  const [state, dispatch] = useReducer(
    Reducer,
    initialState,
    (initial) => initial
  );
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
