import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import LayoutItem from './LayoutItem'
import PanelOn from './PanelOn'
import PanelOff from './PanelOff'

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

const App = () => {
  const classes = useStyles();
  const [isPanelShown, togglePanel] = useState(false);
  const [panelItem, setPanelItem] = useState();
  const [panelIndex, setPanelIndex] = useState();
  const [layout, setLayout] = useState([
    { id: 1, layout: 'header', content: 'foo', htmldescription:'bar', htmlquotes: '', posterurl: '' },
    { id: 2, layout: 'filmlayout', content: 'bar', htmldescription:'baz', htmlquotes: '', posterurl: '' },
    { id: 3, layout: 'footer', content: 'baz', htmldescription:'', htmlquotes: '', posterurl: '' }
  ]);

  const createLayoutItem = meta => {
    const newLayout = [...layout];
    let ts = new Date().getTime();
    let temp = meta ? meta : {
      id: 'id-' + ts,
      layout: 'filmlayout',
      content: '',
      htmldescription:'',
      htmlquotes: '',
      posterurl: ''
    }
    setLayout([...newLayout, temp])
  }

  const deleteLayoutItem = key => {
    const newLayout = [...layout];
    newLayout.splice(key, 1);
    togglePanel(false);
    setLayout(newLayout);
  }

  // FIXME: We set a timer because react-quill doesn't seem to replace an
  // item's default values unless we completely rerender it. If we have to do
  // that, we may as well just wrapper it around just the quill component. Or
  // find another way.
  const editLayoutItem = key => {
    togglePanel(false)
    setPanelIndex(key);
    setPanelItem(layout[key]);
    const timer = setTimeout(() => togglePanel(true), 0);
    return () => clearTimeout(timer)
  }

  const handleChange = name => event => {
    const newLayout = [...layout];
    const temp = {
      ...panelItem,
      [name]: event.target.value
    };
    newLayout[panelIndex] = temp
    setPanelItem(temp);
    setLayout(newLayout);
  }

  // FIXME: optimize this method with one above it
  const handleQuillDesc = html => {
    const newLayout = [...layout];
    const temp = {
      ...panelItem,
      htmldescription: html
    };
    newLayout[panelIndex] = temp
    setPanelItem(temp);
    setLayout(newLayout);
  }

  // FIXME: optimize this method with one above it
  const handleQuillQuote = html => {
    const newLayout = [...layout];
    const temp = {
      ...panelItem,
      htmlquotes: html
    };
    newLayout[panelIndex] = temp
    setPanelItem(temp);
    setLayout(newLayout);
  }

  // Possible red flag: this won't be as easy when this becomes a nested object structure.
  // See https://www.freecodecamp.org/news/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5/
  const moveLayoutItem = (key, new_index) => {
    const newLayout = [...layout];
    if (new_index >= newLayout.length) {
      var k = new_index - newLayout.length + 1;
      while (k--) {
        newLayout.push(undefined);
      }
    }
    newLayout.splice(new_index, 0, newLayout.splice(key, 1)[0]);
    setLayout(newLayout);
    adjustPanelIndex(key, new_index);
  }

  const adjustPanelIndex = (key, new_index) => {
    if (key===panelIndex) {
      setPanelIndex(new_index);
    } else if (new_index>=panelIndex && key<panelIndex) {
      setPanelIndex(panelIndex-1);
    } else if (new_index<=panelIndex && key>panelIndex) {
      setPanelIndex(panelIndex+1);
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid
        container
        component="main"
        className={classes.root}>
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item lg={8} className={classes.render}>
            {layout.map((item, index) =>
              <LayoutItem
                key={item.id}
                id={item.id}
                index={index}
                item={item}
                deleteLayoutItem={deleteLayoutItem}
                editLayoutItem={editLayoutItem}
                moveLayoutItem={moveLayoutItem} />)}
          </Grid>
          <Grid item lg={4} className={classes.panel}>
            {isPanelShown &&
              <PanelOn
                panelItem={panelItem}
                handleChange={handleChange}
                handleQuillDesc={handleQuillDesc}
                handleQuillQuote={handleQuillQuote}
                turnOff={() => togglePanel(false)} />
            }
            {!isPanelShown &&
              <PanelOff
                createLayoutItem={createLayoutItem} />
            }
          </Grid>
        </Grid>
      </Grid>
    </DndProvider>
  );
}

export default App;
