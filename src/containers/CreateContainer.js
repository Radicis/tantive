import React, { useContext } from 'react';
import { Context } from '../store/Store';
import { ipcRenderer } from 'electron';
import { host, port } from '../config';
import axios from 'axios';
import Create from '../components/Create/Create';

function CreateContainer() {
  const [state, dispatch] = useContext(Context);
  const { showCreate, windows } = state;

  const hideCreate = () => {
    dispatch({
      type: 'HIDE_CREATE'
    });
  };

  const handleSubmit = async (name, filePath, args) => {
    try {
      const { data } = await axios.post(`http://${host}:${port}/scripts`, {
        name,
        path: filePath,
        args
      });
      dispatch({
        type: 'CREATE_SCRIPT',
        payload: data
      });
      const { id } = data;
      const { data: runData } = await axios.post(
        `http://${host}:${port}/runs/${id}`,
        {
          windowId: windows.length
        }
      );
      const { runId } = runData;
      dispatch({
        type: 'CREATE_SCRIPT_WINDOW',
        payload: {
          id,
          runId,
          status: 'Ready'
        }
      });
      hideCreate();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <React.Fragment>
      {showCreate ? (
        <Create handleSubmit={handleSubmit} hideCreate={hideCreate} />
      ) : (
        ''
      )}
    </React.Fragment>
  );
}

export default CreateContainer;
