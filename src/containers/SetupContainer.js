import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../store/Store';

function SetupContainer() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  const loadScripts = async () => {
    return await axios.get('http://localhost:5555/scripts');
  };

  const loadDocuments = async () => {
    return await axios.get('http://localhost:5555/documents');
  };

  const load = async () => {
    try {
      dispatch({
        type: 'SET_LOADING',
        payload: true
      });
      const { data: documents } = await loadDocuments();
      dispatch({
        type: 'SET_DOCUMENTS',
        payload: documents
      });
      const { data: scripts } = await loadScripts();
      dispatch({
        type: 'SET_SCRIPTS',
        payload: scripts
      });
      dispatch({
        type: 'SET_LOADING',
        payload: false
      });
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: e
      });
    }
  };

  useEffect(() => {
    load();
  }, []);
  return <div />;
}

export default SetupContainer;
