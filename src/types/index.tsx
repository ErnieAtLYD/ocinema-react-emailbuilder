// src/types/index.tsx

export interface IRESTAPI {
  DateTBD: string,
  Duration: string,
  ID: string,
  SalesMessage: string,
  ShortDescription: string,
  start_date: string,
  end_date: string,
  legacy_purchase_link: string
}

export interface IShowtimeTable {
  showDate: string,
  showTimes: IRESTAPI[]
}

export interface ShowtimesProps {
  showtimes: IRESTAPI[]
}

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
