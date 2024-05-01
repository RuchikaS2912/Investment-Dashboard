/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer, useState } from 'react';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import mainReducer from './store/combinedReducer';
import AppContext from './Context';

const initialState = {
  investments: {
    investments2024: [],
  },
  monthlyexpense: {
    monthlySpends2024: [],
    monthlySpends2023: [],
  },
  salary: {
    salaries_23_24: [],
    salaries_22_23: [],
  },
  creditcards: {
    ccSpend2024: [],
    ccSpend2023: [],
  },
  bills: {
    billsToBePaid: [],
  },
};

const App = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const val = {
    state,
    dispatch,
  };

  console.log('val.state', val.state);

  return (
    <AppContext.Provider value={val}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
            <HashRouter>
              <Switch>
                {/* <Redirect from="/" to="/admin" /> */}
                <Route path={`/auth`} component={AuthLayout} />
                <Route path={`/admin`} component={AdminLayout} />
                <Route path={`/rtl`} component={RtlLayout} />
                <Redirect from="/" to="/admin" />
              </Switch>
            </HashRouter>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </AppContext.Provider>
  );
};

export default App;
