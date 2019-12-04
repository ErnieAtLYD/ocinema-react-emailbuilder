// @flow
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import RenderedNewsletter from "../components/RenderedNewsletter";

import PanelOnContainer from "../containers/PanelOnContainer";
import PanelOffContainer from "../containers/PanelOffContainer";

const useStyles = makeStyles((theme: any): any => ({
  root: {
    height: "100vh"
  },
  render: {
    background: "#b8b8b8",
    height: "100vh",
    overflowY: "scroll"
  },
  container: {},
  panel: {}
}));

const App = ({ layout, panel, actions }: AppType): React$Element<any> => {
  const classes: { [key: string]: any } = useStyles();
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item md={8} className={classes.render}>
            <RenderedNewsletter layout={layout} />
          </Grid>
          <Grid item md={4} className={classes.panel}>
            {panel.visibility && <PanelOnContainer />}
            {!panel.visibility && <PanelOffContainer />}
          </Grid>
        </Grid>
      </Grid>
    </DndProvider>
  );
};

const mapStateToProps = (state: StateType): StateType => ({
  layout: state.layout,
  panel: state.panel
});

const mapDispatchToProps = (dispatch: Dispatch): {| actions: any |} => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
