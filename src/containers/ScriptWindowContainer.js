import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/Store';
import { ipcRenderer } from 'electron';
import axios from 'axios';
import ScriptWindow from '../components/ScriptWindow/ScriptWindow';
import PropTypes from 'prop-types';

function ScriptWindowContainer({
  name,
  closeWindow,
  logLines,
  setFocused,
  focused,
  params,
  status,
  windowId,
  canExpand,
  runId,
  id
}) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);
  const [nameUpdateTimeout, setNameUpdateTimeout] = useState(null);
  const [paramsUpdateTimeout, setParamsUpdateTimeout] = useState(null);
  const [args, setArgs] = useState([]);

  const closeAndTerminateWindow = () => {
    if (runId) {
      terminateScript(runId);
    }
    closeWindow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/scripts/${id}`);
      dispatch({
        type: 'CLOSE_WINDOW',
        payload: windowId
      });
      dispatch({
        type: 'DELETE_SCRIPT',
        payload: id
      });
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: e
      });
    }
  };

  const handleParamsChange = (params) => {
    clearTimeout(paramsUpdateTimeout);
    setParamsUpdateTimeout(
      setTimeout(async () => {
        try {
          await axios.put(`http://localhost:5555/scripts/${id}`, {
            params
          });
          dispatch({
            type: 'UPDATE_SCRIPT',
            payload: {
              id,
              item: { args }
            }
          });
        } catch (e) {
          dispatch({
            type: 'SET_ERROR',
            payload: e
          });
        }
      }, 1500)
    );
  };

  const handleNameChange = (id, name) => {
    clearTimeout(nameUpdateTimeout);
    setNameUpdateTimeout(
      setTimeout(async () => {
        try {
          await axios.put(`http://localhost:5555/scripts/${id}`, {
            name
          });
          dispatch({
            type: 'UPDATE_SCRIPT',
            payload: {
              id,
              item: { name }
            }
          });
        } catch (e) {
          dispatch({
            type: 'SET_ERROR',
            payload: e
          });
        }
      }, 1500)
    );
  };

  const runScript = (args) => {
    ipcRenderer.send('run', { runId, windowId, args });
  };

  const terminateScript = (runId) => {
    ipcRenderer.send('terminate', { runId });
  };

  useEffect(() => {
    return () => {
      ipcRenderer.send('terminate', { runId });
      console.log('removed');
    };
  }, []);

  return (
    <ScriptWindow
      focused={focused}
      logLines={logLines}
      name={name}
      args={args}
      params={params}
      status={status}
      canExpand={canExpand}
      closeWindow={closeAndTerminateWindow}
      handleNameChange={handleNameChange}
      terminateScript={() => terminateScript()}
      runScript={() => runScript()}
      handleDelete={() => handleDelete(id)}
      setFocused={setFocused}
      setArgs={setArgs}
    />
  );
}

ScriptWindowContainer.propTypes = {
  id: PropTypes.string,
  runId: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  status: PropTypes.string,
  windowId: PropTypes.number,
  closeWindow: PropTypes.func,
  focused: PropTypes.bool,
  isNew: PropTypes.bool,
  canExpand: PropTypes.bool,
  setFocused: PropTypes.func,
  logLines: PropTypes.array,
  params: PropTypes.array
};

export default ScriptWindowContainer;
