// @flow
import React, { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { inlineContent } from 'juice';
import Inky from 'react-inky';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import LayoutTemplateWrapper from './LayoutTemplateWrapper';
import parse from 'siphon-media-query';

import newsletterStyles from '../styles/newsletter.scss';
import './ExportTemplate.scss';

// This gets called from the exportAsHTML method in /actions
export const getExportedHTML = (layout: any): any => {
  const markup = renderToStaticMarkup(
    <Inky>
      <Inky.Head>
        <style>
          {parse(newsletterStyles)}
        </style>
      </Inky.Head>
      <Inky.Body>
        {layout.map((item: NewsletterLayoutItemType, index: any): React$Element<any> => <LayoutTemplateWrapper item={item} />)}
      </Inky.Body>
    </Inky>
  );
  return inlineContent(Inky.doctype + markup, newsletterStyles);
}

type ComponentType = {
  layout: Array<any>,
  exportAsHTML: Function
}

const ExportTemplate = ({ layout, exportAsHTML }: ComponentType): React$Element<({children?: React$Node}) => React$Node> => {
  const [open, setOpen] = useState(false);
  const [newsletterHTML, setHTML] = useState();

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleExport = (layout: any): void => {
    exportAsHTML();
    setHTML(getExportedHTML(layout));
    handleOpen();
  }

  return (
    <>
      <Button onClick={(): void => { handleExport(layout) }}>
        Export as HTML
      </Button>
      <Modal
        open={open}
        onClose={handleClose}>
        <div className="modal">
          <p>Copy and paste the HTML.</p>
          <textarea
            value={newsletterHTML}
          >
          </textarea>
          <Button>
            Copy to Clipboard
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ExportTemplate;
