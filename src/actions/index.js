// @flow
export const createLayoutItem = (
  meta: ?NewsletterLayoutItemType = null
): ActionCreateLayoutItem => {
  const ts = new Date().getTime();
  const objItem = meta
    ? meta
    : {
        id: ts,
        layout: "full-bleed-wrapper-2",
        content: "",
        htmldescription: "",
        htmlquotes: "",
        posterurl: "",
        bannerurl: "https://placehold.it/580x100",
        ctalabel: "",
        ctaurl: ""
      };
  return {
    type: "CREATE_LAYOUT_ITEM",
    payload: objItem
  };
};

export const deleteLayoutItem = (key: number): ActionDeleteLayoutItem => {
  return {
    type: "DELETE_LAYOUT_ITEM",
    key: key
  };
};

export const editLayoutItem = (key: number): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState): void => {
    const state = getState();
    dispatch({
      type: "EDIT_LAYOUT_ITEM",
      payload: {
        index: key,
        item: state.layout[key]
      }
    });
  };
};

export const moveLayoutItem = (
  key: number,
  newIndex: number
): ActionMoveLayoutItem => {
  return {
    type: "MOVE_LAYOUT_ITEM",
    key: key,
    newIndex: newIndex
  };
};

export const editPanelField = (event: any, name: string): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    dispatch({
      type: "UPDATE_PANEL_FIELD",
      payload: {
        name: name,
        index: state.panelIndex,
        value: event.target.value
      }
    });
  };
};

export const editPanelQuill = (
  newValue: string,
  source: string,
  field: string = "htmldescription"
): ThunkAction => {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    dispatch({
      type: "UPDATE_PANEL_FIELD",
      payload: {
        name: field,
        index: state.panelIndex,
        value: newValue
      }
    });
  };
};

export const exportAsHTML = (): ActionExportHTML => {
  return { type: "EXPORT_HTML" };
};

export const hidePanel = (): ActionHidePanel => {
  return { type: "HIDE_PANEL" };
};
