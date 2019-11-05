import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import RenderedNewsletter from '../components/RenderedNewsletter'
import PanelOn from '../components/PanelOn'
import PanelOff from '../components/PanelOff'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  render: {
    background: '#b8b8b8',
    height: '100vh',
    overflowY: 'scroll'
  },
  container: {
  },
  panel: {
  }
}));

const App = ({ layout, panel, panelIndex, panelItem, actions }) => {
  const classes = useStyles();

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid
        container
        component="main"
        className={classes.root}>
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item lg={8} className={classes.render}>
            <RenderedNewsletter
              layout={layout}
              deleteLayoutItem={actions.deleteLayoutItem}
              editLayoutItem={actions.editLayoutItem}
              moveLayoutItem={actions.moveLayoutItem}
            />
          </Grid>
          <Grid item lg={4} className={classes.panel}>
            {panel.visibility &&
              <PanelOn
                panelItem={panelItem}
                editPanelField={actions.editPanelField}
                editPanelQuill={actions.editPanelQuill}
                hidePanel={actions.hidePanel}
              />
            }
            {!panel.visibility &&
              <PanelOff
                createLayoutItem={actions.createLayoutItem}
                exportAsHTML={actions.exportAsHTML}
              />
            }
          </Grid>
        </Grid>
      </Grid>
    </DndProvider>
  );
}

function mapStateToProps(state) {
  return {
    layout: state.layout,
    panel: state.panel,
    panelIndex: state.panelIndex,
    panelItem: state.panelItem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
