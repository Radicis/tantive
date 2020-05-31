const createNewScriptWindow = ({ id, runId }, scripts, windowId) => {
  const script = scripts.find((s) => id === s.id);
  const { name, params } = script;
  return {
    windowId,
    runId,
    id,
    params,
    name,
    type: 'SCRIPT',
    status: 'Ready',
    logLines: [],
    args: []
  };
};

const createDocumentWindow = (id, documents, windowId) => {
  const document = documents.find((d) => id === d.id);
  const { name, content } = document;
  return {
    windowId,
    id,
    name,
    content,
    status: 'Ready'
  };
};

const createNewDocumentWindow = (documents, windowId) => {
  return {
    windowId,
    name: '',
    content: '',
    isNew: true,
    status: 'New Document'
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
    case 'CREATE_NEW_DOCUMENT_WINDOW':
      return {
        ...state,
        windows: [
          ...state.windows,
          {
            ...createNewDocumentWindow(state.documents, state.windows.length)
          }
        ]
      };
    case 'CREATE_DOCUMENT_WINDOW':
      return {
        ...state,
        windows: [
          ...state.windows,
          {
            ...createDocumentWindow(
              action.payload.id,
              state.documents,
              state.windows.length,
              action.payload.isNew
            )
          }
        ]
      };
    case 'CREATE_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, action.payload.data],
        windows: state.windows.map((w) => {
          if (w.windowId === action.payload.windowId) {
            return {
              ...w,
              ...action.payload.data
            };
          }
          return w;
        })
      };
    case 'UPDATE_WINDOW_CONTENT':
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.windowId === action.payload.windowId) {
            return {
              ...w,
              ...action.payload.data
            };
          }
          return w;
        })
      };
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map((d) => {
          if (d.id === action.payload.id) {
            return {
              ...d,
              ...action.payload.item
            };
          }
          return d;
        }),
        windows: state.windows.map((w) => {
          if (w.id === action.payload.id) {
            return {
              ...w,
              ...action.payload.item
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
          {
            ...createNewScriptWindow(
              action.payload,
              state.scripts,
              state.windows.length
            )
          }
        ]
      };
    case 'CREATE_SCRIPT':
      return {
        ...state,
        scripts: [...state.scripts, action.payload]
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
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        windows: [...state.windows.filter((w) => w.id !== action.payload)],
        documents: [...state.documents.filter((d) => d.id !== action.payload)]
      };
    case 'DELETE_SCRIPT':
      return {
        ...state,
        windows: [...state.windows.filter((w) => w.id !== action.payload)],
        scripts: [...state.scripts.filter((s) => s.id !== action.payload)]
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
    case 'SET_CONFIRM_ACTION':
      return {
        ...state,
        confirmAction: action.payload
      };
    case 'UNSET_CONFIRM_ACTION':
      return {
        ...state,
        confirmAction: () => {}
      };
    case 'SHOW_CONFIRM':
      return {
        ...state,
        showConfirm: action.payload
      };
    case 'HIDE_CONFIRM':
      return {
        ...state,
        showConfirm: false
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
    case 'SHOW_HELP':
      return {
        ...state,
        showHelp: true
      };
    case 'HIDE_HELP':
      return {
        ...state,
        showHelp: false
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        error: null,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
