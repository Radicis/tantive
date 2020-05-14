import './assets/css/index.css';
import React from 'react';
import Store from './store/Store';
import RendererBridgeContainer from './containers/RendererBridgeContainer';
import SetupContainer from './containers/SetupContainer';
import MainContainer from './containers/MainContainer';

function App() {
  return (
    <Store>
      <RendererBridgeContainer />
      <SetupContainer />
      <MainContainer />
    </Store>
  );
}

export default App;
