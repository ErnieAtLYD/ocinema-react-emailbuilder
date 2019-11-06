import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppProps, IStore } from '../types';
import * as Actions from '../actions';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import RenderedNewsletter from '../components/RenderedNewsletter'
import PanelOn from '../components/PanelOn'
import PanelOff from '../components/PanelOff'

const App = ({ layout, panel, panelIndex, panelItem, actions }: AppProps) => {
  var showPanel;
  if (panel.visibility) {
    showPanel = (
      <PanelOn
        panelItem={panelItem}
        editPanelField={actions.editPanelField}
        editPanelQuill={actions.editPanelQuill}
        hidePanel={actions.hidePanel}
      />
    )
  } else {
    showPanel = (
      <PanelOff
        createLayoutItem={actions.createLayoutItem}
        exportAsHTML={actions.exportAsHTML}
      />
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid
        container
        component="main"
        style={{ height: '100vh' }}
      >
        <CssBaseline />
        <Grid container>
          <Grid
            item
            lg={8}
            style={{ background: '#b8b8b8', height: '100vh', overflowY: 'scroll'}}
          >
            <RenderedNewsletter
              layout={layout}
              deleteLayoutItem={actions.deleteLayoutItem}
              editLayoutItem={actions.editLayoutItem}
              moveLayoutItem={actions.moveLayoutItem}
            />
          </Grid>
          <Grid item lg={4}>
            {showPanel}
          </Grid>
        </Grid>
      </Grid>
    </DndProvider>
  );
}

function mapStateToProps(state: IStore): IStore {
  return {
    layout: state.layout,
    panel: state.panel,
    panelIndex: state.panelIndex,
    panelItem: state.panelItem,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
  return {
    actions: bindActionCreators<any, any>(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
