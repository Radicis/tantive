import React, { useContext } from 'react';
import { Context } from '../store/Store';
import WindowContainer from './WindowContainer';
import SidebarContainer from './SidebarContainer';
import SearchContainer from './SearchContainer';
import CreateContainer from './CreateContainer';
import Loading from '../components/Loading/Loading';

function MainContainer() {
  const [state] = useContext(Context);
  const { loading } = state;
  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative main-grid grid grid-flow-col w-full h-full bg-dark">
          <SearchContainer />
          <CreateContainer />
          <SidebarContainer />
          <WindowContainer />
        </div>
      )}
    </React.Fragment>
  );
}

export default MainContainer;
