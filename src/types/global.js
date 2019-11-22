type GetState = () => StateType;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;

type ActionCreateLayoutItem = {
  type: "CREATE_LAYOUT_ITEM",
  payload: NewsletterLayoutItemType,
};
type ActionDeleteLayoutItem = {type: "DELETE_LAYOUT_ITEM", key: number};
type ActionEditLayoutItem = {
  type: "EDIT_LAYOUT_ITEM",
  payload: {index: number, item: any},
};
type ActionMoveLayoutItem = {
  type: "MOVE_LAYOUT_ITEM",
  key: number,
  newIndex: number,
};
type ActionUpdatePanelField = {
  type: "UPDATE_PANEL_FIELD",
  payload: {name: string, index: number, value: any},
};
type ActionHidePanel = {type: "HIDE_PANEL"};
type ActionExportHTML = {type: "EXPORT_HTML"};
type ActionDropDraggedButtonIntoColumn = {
  type: "DROP_DRAGGED_BUTTON_INTO_COLUMN_CONTENT",
  payload: {columnId: number},
};

type Action =
  | ActionCreateLayoutItem
  | ActionDeleteLayoutItem
  | ActionEditLayoutItem
  | ActionMoveLayoutItem
  | ActionUpdatePanelField
  | ActionHidePanel
  | ActionExportHTML
  | ActionDropDraggedButtonIntoColumn;

type NewsletterLayoutType = Array<NewsletterLayoutItemType>;

type ColumnElementType = {
  id: number,
};

type NewsletterLayoutItemType = {
  id: number,
  layout: string,
  content: string,
  contents: Array<ColumnElementType>,
  htmldescription: string,
  htmlquotes: string,
  posterurl: string,
  bannerurl?: string,
};

type WebsiteEventAPIType = {
  id: string,
  title: string,
};

type PanelStateType = {
  visibility: boolean,
};

type StateType = {|
  layout: NewsletterLayoutType,
  panel: PanelStateType,
  panelIndex: number,
  panelItem: NewsletterLayoutItemType,
|};

type ActionsType = {|
  actions: {[key: string]: any},
|};

type AppType = {|...StateType, ...ActionsType|};
