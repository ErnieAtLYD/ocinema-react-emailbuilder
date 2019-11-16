export const CREATE_LAYOUT_ITEM = 'CREATE_LAYOUT_ITEM';
export const DELETE_LAYOUT_ITEM = 'DELETE_LAYOUT_ITEM';
export const EDIT_LAYOUT_ITEM   = 'EDIT_LAYOUT_ITEM';
export const MOVE_LAYOUT_ITEM   = 'MOVE_LAYOUT_ITEM';
export const UPDATE_PANEL_FIELD = 'UPDATE_PANEL_FIELD';
export const HIDE_PANEL         = 'HIDE_PANEL';
export const EXPORT_HTML        = 'EXPORT_HTML';

export const createLayoutItem = (meta = null) => {
  const ts = new Date().getTime();
  const objItem = meta ? meta : {
    id: 'id-' + ts,
    layout: 'full-bleed-wrapper-2',
    content: '',
    htmldescription:'',
    htmlquotes: '',
    posterurl: '',
    bannerurl: 'https://placehold.it/580x100'
  }
  return {
    type: CREATE_LAYOUT_ITEM,
    payload: objItem
  }
}

export const deleteLayoutItem = (key: number) => {
  return {
    type: DELETE_LAYOUT_ITEM,
    key
  }
}

// see: https://gist.github.com/markerikson/ea4d0a6ce56ee479fe8b356e099f857e
export const editLayoutItem = (key: number) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: EDIT_LAYOUT_ITEM,
      payload: {
        index: key,
        item: state.layout[key]
      }
    });
  }
}

export const moveLayoutItem = (key: number, newIndex: number) => {
  return {
    type: MOVE_LAYOUT_ITEM,
    key,
    newIndex
  }
}

export const editPanelField = (event, name: string) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: UPDATE_PANEL_FIELD,
      payload: {
        name: name,
        index: state.panelIndex,
        value: event.target.value
      }
    });
  }
}

export const editPanelQuill = (newValue, source, field = 'htmldescription') => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: UPDATE_PANEL_FIELD,
      payload: {
        name: field,
        index: state.panelIndex,
        value: newValue
      }
    });
  }
}

export const exportAsHTML = () => {
  return {
    type: EXPORT_HTML
  }
}

export const hidePanel = () => {
  return {
    type: HIDE_PANEL,
  }
}
