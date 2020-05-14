const createNewScriptWindow = (script, count) => {
  const { name, params } = script;
  return {
    windowId: count,
    params,
    name,
    type: 'SCRIPT',
    status: 'Creating...',
    logLines: [],
    args: []
  };
};

const createNewEditorWindow = (document, count, isNew) => {
  const { name, content, id } = document;
  return {
    windowId: count,
    id,
    name,
    content,
    type: 'MARKDOWN',
    status: 'Rendering',
    isNew
  };
};

const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCRIPTS':
      return {
        ...state,
        scripts: action.payload
      };
    case 'SET_DOCUMENTS':
      return {
        ...state,
        documents: action.payload
      };
    case 'CREATE_DOCUMENT_WINDOW':
      return {
        ...state,
        windows: [
          ...state.windows,
          {
            ...createNewEditorWindow(
              state.documents.find((d) => d.id === action.payload.id),
              state.windows.length,
              action.payload.isNew
            )
          }
        ]
      };
    case 'CREATE_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, action.payload]
      };
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map((d) => {
          if (d.id === action.payload.id) {
            return {
              ...d,
              content: action.payload.content
            };
          }
          return d;
        }),
        windows: state.windows.map((w) => {
          if (w.windowId === action.payload.windowId) {
            return {
              ...w,
              content: action.payload.content
            };
          }
          return w;
        })
      };
    case 'CREATE_SCRIPT_WINDOW':
      return {
        ...state,
        windows: [
          ...state.windows,
          { ...createNewScriptWindow(action.payload, state.windows.length) }
        ]
      };
    case 'CREATE_EDITOR_WINDOW':
      return {
        ...state,
        windows: [
          ...state.windows,
          { ...createNewEditorWindow(action.payload, state.windows.length) }
        ]
      };
    case 'SET_WINDOW_STATUS':
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.windowId === action.payload.windowId) {
            return {
              ...w,
              status: action.payload.status
            };
          }
          return w;
        })
      };
    case 'SET_WINDOW_RUN_ID':
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.windowId === action.payload.windowId) {
            return {
              ...w,
              runId: action.payload.runId,
              status: 'Ready'
            };
          }
          return w;
        })
      };
    case 'PUSH_WINDOW_LOG':
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.windowId === action.payload.windowId) {
            w.logLines.push(action.payload.message);
          }
          return w;
        })
      };
    case 'CLOSE_WINDOWS':
      return {
        ...state,
        windows: []
      };
    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter((w) => w.windowId !== action.payload)
      };
    case 'SHOW_CREATE':
      return {
        ...state,
        showCreate: true
      };
    case 'HIDE_CREATE':
      return {
        ...state,
        showCreate: false
      };
    case 'SHOW_SEARCH':
      return {
        ...state,
        showSearch: true
      };
    case 'HIDE_SEARCH':
      return {
        ...state,
        showSearch: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
