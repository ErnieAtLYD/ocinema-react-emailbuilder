import { Dispatch } from 'redux';
import { getExportedHTML } from '../components/ExportTemplate';
import { IPanelItem } from '../types';

export enum EActionKeys {
  CREATE_LAYOUT_ITEM = 'CREATE_LAYOUT_ITEM',
  DELETE_LAYOUT_ITEM = 'DELETE_LAYOUT_ITEM',
  EDIT_LAYOUT_ITEM   = 'EDIT_LAYOUT_ITEM',
  MOVE_LAYOUT_ITEM   = 'MOVE_LAYOUT_ITEM',
  UPDATE_PANEL_FIELD = 'UPDATE_PANEL_FIELD',
  HIDE_PANEL         = 'HIDE_PANEL',
  EXPORT_HTML        = 'EXPORT_HTML'
}

export interface IActionKeys {
  type: EActionKeys
}

export interface IActioncreateLayoutItem {
  type: EActionKeys.CREATE_LAYOUT_ITEM,
  payload: any
}

export interface IActiondeleteLayoutItem {
  type: EActionKeys.DELETE_LAYOUT_ITEM,
  key: number
}

export interface IActionmoveLayoutItem {
  type: EActionKeys.MOVE_LAYOUT_ITEM,
  key: number,
  newIndex: number
}

export const createLayoutItem = (meta: IPanelItem = null): IActioncreateLayoutItem => {
  const ts = new Date().getTime();
  const objItem = meta ? meta : {
    id: ts,
    layout: 'full-bleed-wrapper-2',
    content: '',
    htmldescription:'',
    htmlquotes: '',
    posterurl: '',
    bannerurl: 'https://placehold.it/580x100'
  }
  return {
    type: EActionKeys.CREATE_LAYOUT_ITEM,
    payload: objItem
  }
}

export const deleteLayoutItem = (key: number): IActiondeleteLayoutItem => {
  return {
    type: EActionKeys.DELETE_LAYOUT_ITEM,
    key
  }
}

// see: https://gist.github.com/markerikson/ea4d0a6ce56ee479fe8b356e099f857e
export const editLayoutItem = (key: number) => {
  return (dispatch: Dispatch, getState: any) => {
    const state = getState();
    dispatch({
      type: EActionKeys.EDIT_LAYOUT_ITEM,
      payload: {
        index: key,
        item: state.layout[key]
      }
    });
  }
}

export const moveLayoutItem = (
  key: number,
  newIndex: number
): IActionmoveLayoutItem => {
  return {
    type: EActionKeys.MOVE_LAYOUT_ITEM,
    key,
    newIndex
  }
}

export const editPanelField = (event: any, name: string) => {
  return (dispatch: Dispatch, getState: any) => {
    const state = getState();
    dispatch({
      type: EActionKeys.UPDATE_PANEL_FIELD,
      payload: {
        name: name,
        index: state.panelIndex,
        value: event.target.value
      }
    });
  }
}

export const editPanelQuill = (
  newValue: string,
  source: string,
  field: string
) => {
  return (dispatch: Dispatch, getState: any) => {
    const state = getState();
    dispatch({
      type: EActionKeys.UPDATE_PANEL_FIELD,
      payload: {
        name: field,
        index: state.panelIndex,
        value: newValue
      }
    });
  }
}

export const exportAsHTML = () => (dispatch: Dispatch, getState: any) => {
  const state = getState();
  getExportedHTML(state.layout);
  dispatch({
    type: EActionKeys.EXPORT_HTML,
  });
}

export const hidePanel = () => {
  return {
    type: EActionKeys.HIDE_PANEL,
  }
}
