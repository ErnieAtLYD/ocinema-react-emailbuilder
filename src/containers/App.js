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
import PanelOn from "../components/PanelOn";
import PanelOff from "../components/PanelOff";

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

const App = ({
  layout,
  panel,
  panelIndex,
  panelItem,
  actions
}: AppType): React$Element<any> => {
  const classes: { [key: string]: any } = useStyles();
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item md={8} className={classes.render}>
            <RenderedNewsletter
              layout={layout}
              deleteLayoutItem={actions.deleteLayoutItem}
              duplicateLayoutItem={actions.duplicateLayoutItem}
              editLayoutItem={actions.editLayoutItem}
              moveLayoutItem={actions.moveLayoutItem}
            />
          </Grid>
          <Grid item md={4} className={classes.panel}>
            {panel.visibility && (
              <PanelOn
                panelItem={panelItem}
                editPanelField={actions.editPanelField}
                editPanelQuill={actions.editPanelQuill}
                hidePanel={actions.hidePanel}
              />
            )}
            {!panel.visibility && (
              <PanelOff
                createLayoutItem={actions.createLayoutItem}
                exportAsHTML={actions.exportAsHTML}
                layout={layout}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </DndProvider>
  );
};

function mapStateToProps(state: StateType): StateType {
  return {
    layout: state.layout,
    panel: state.panel,
    panelIndex: state.panelIndex,
    panelItem: state.panelItem
  };
}

function mapDispatchToProps(dispatch: any): {| actions: any |} {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
