import './assets/css/index.css';
import React from 'react';
import Store from './store/Store';
import RendererBridgeContainer from './containers/RendererBridgeContainer';
import SetupContainer from './containers/SetupContainer';
import MainContainer from './containers/MainContainer';
import SearchContainer from './containers/SearchContainer';
import CreateContainer from './containers/CreateContainer';
import HelpContainer from './containers/HelpContainer';

function App() {
  return (
    <Store>
      <RendererBridgeContainer />
      <SetupContainer />
      <HelpContainer />
      <SearchContainer />
      <CreateContainer />
      <MainContainer />
    </Store>
  );
}

export default App;
