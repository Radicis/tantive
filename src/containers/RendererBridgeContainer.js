import React, { useContext, useEffect } from 'react';
import { Context } from '../store/Store';
import { ipcRenderer } from 'electron';

function RendererBridgeContainer() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    ipcRenderer.send('reset');

    ipcRenderer.on('status', (e, { windowId, status }) => {
      dispatch({
        type: 'SET_WINDOW_STATUS',
        payload: {
          windowId,
          status
        }
      });
    });

    ipcRenderer.on('message', (e, { windowId, data }) => {
      dispatch({
        type: 'PUSH_WINDOW_LOG',
        payload: {
          windowId,
          message: data
        }
      });
    });
  }, []);

  return <div />;
}

export default RendererBridgeContainer;
