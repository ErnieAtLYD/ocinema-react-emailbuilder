import { combineReducers } from "redux";
import LayoutReducer from "./layout";
import PanelReducer from "./panel";
import PanelIndexReducer from "./panelIndex";
import PanelItemReducer from "./panelItem";
import PanelFieldStatusReducer from "./panelFieldStatus";

const rootReducer = combineReducers({
  layout: LayoutReducer,
  panel: PanelReducer,
  panelIndex: PanelIndexReducer,
  panelItem: PanelItemReducer,
  panelFieldStatus: PanelFieldStatusReducer
});

export default rootReducer;
