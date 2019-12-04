// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import LayoutItem from "../components/LayoutItem";

const mapStateToProps = state => ({ layout: state.layout });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LayoutItem);
