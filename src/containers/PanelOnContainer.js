// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import PanelOn from "../components/PanelOn";

const mapStateToProps = state => ({
  panelItem: state.panelItem,
  panelFieldStatus: state.panelFieldStatus
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelOn);
