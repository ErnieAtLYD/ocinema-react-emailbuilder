import React from 'react';

const HTMLWidget = ({ isExporting, html }) => {

  if (isExporting) {
    console.log('ping', isExporting);
  }

  return (
    <>
      <textarea
        style={{
          width: '100%',
          height: '20vh'
        }}
        readOnly
        value={html}
      />
    </>
  )
}
export default HTMLWidget;
