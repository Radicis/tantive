import './assets/css/index.css';
import React from 'react';
import Store from './store/Store';
import WindowContainer from './containers/WindowContainer';
import RendererBridgeContainer from './containers/RendererBridgeContainer';
import SidebarContainer from './containers/SidebarContainer';
import SearchContainer from './containers/SearchContainer';

function App() {
  return (
    <Store>
      <RendererBridgeContainer />
      <div className="relative main-grid grid grid-flow-col w-full h-full bg-dark">
        <SearchContainer />
        <SidebarContainer />
        <WindowContainer />
      </div>
    </Store>
  );
}

export default App;
