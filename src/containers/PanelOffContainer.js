// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import PanelOff from "../components/PanelOff";

const mapStateToProps = (state: any): any => ({ layout: state.layout });
const mapDispatchToProps = (dispatch: Dispatch): {| actions: any |} => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelOff);
