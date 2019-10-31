import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { inlineContent } from 'juice';
import Inky from 'react-inky';
import Button from '@material-ui/core/Button';
import LayoutTemplateWrapper from './LayoutTemplateWrapper';
import newsletterStyles from './LayoutTemplateWrapper.scss';
import parse from 'siphon-media-query';

// This gets called from the exportAsHTML method in /actions
export const getExportedHTML = layout => {
  const markup = renderToStaticMarkup(
    <Inky>
      <Inky.Head>
        <style>
        </style>
      </Inky.Head>
      <Inky.Body>
        {layout.map((item, index) => <LayoutTemplateWrapper item={item} />)}
      </Inky.Body>
    </Inky>
  );
  // console.log( parse(newsletterStyles) )
  console.log(newsletterStyles)
  console.log( inlineContent(Inky.doctype + markup, newsletterStyles) )
}

const ExportTemplate = ({ exportAsHTML }) => (
  <Button onClick={exportAsHTML}>
    Export as HTML
  </Button>
)

export default ExportTemplate;
