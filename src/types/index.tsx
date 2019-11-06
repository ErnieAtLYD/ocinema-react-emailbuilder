// src/types/index.tsx

export interface AppProps {
  layout: object[],
  panel: {
    visibility: boolean
  },
  panelIndex: number,
  panelItem: object,
  actions: {
    editPanelField: () => void,
    editPanelQuill: () => void,
    hidePanel: () => void,
    createLayoutItem: () => void,
    exportAsHTML: () => void,
    deleteLayoutItem: () => void,
    editLayoutItem: () => void,
    moveLayoutItem: () => void,
  }
}

export interface IStore {
  layout: Array<IPanelItem>,
  panel: any,
  panelIndex: any,
  panelItem: any,
}

export interface IPanelItem {
  id: number,
  layout: string,
  content?: string,
  htmldescription?: string,
  htmlquotes?: string,
  posterurl?: string,
  bannerurl?: string
}
