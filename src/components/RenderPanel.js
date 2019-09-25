import React from 'react';
import { Wrapper, Container, Row, Column } from 'react-inky';
import { renderToStaticMarkup } from 'react-dom/server';

const sampleFeed = [
  {
    'id': 1,
    'title': 'Tel Aviv on Fire',
    'description': 'Salam, a Palestinian living in Jerusalem, works on a popular soap opera. He gets ideas for the show from the commander at the checkpoint he passes through each day, and his career takes off.',
    'poster': 'https://image.tmdb.org/t/p/w220_and_h330_face/dHRojbGfWCFvk2wfBPd66hx7OCv.jpg'
  },
  {
    'id': 2,
    'title': 'Before You Know It',
    'description': 'Salam, a Palestinian living in Jerusalem, works on a popular soap opera. He gets ideas for the show from the commander at the checkpoint he passes through each day, and his career takes off.',
    'poster': 'https://image.tmdb.org/t/p/w220_and_h330_face/dHRojbGfWCFvk2wfBPd66hx7OCv.jpg'
  }
];

const RenderPanel = ({layout}) => {

  console.log(layout);

  // FIXME: static vars to be dynamic later
  // notes: We'll need to account for fact that description will be HTML
  const movie = {
    'title': 'Tel Aviv on Fire',
    'description': 'Salam, a Palestinian living in Jerusalem, works on a popular soap opera. He gets ideas for the show from the commander at the checkpoint he passes through each day, and his career takes off.',
    'poster': 'https://image.tmdb.org/t/p/w220_and_h330_face/dHRojbGfWCFvk2wfBPd66hx7OCv.jpg'
  };

  const layout_2 = (
    <Row>
      <Column large="3">
        <p>
          <img src={movie.poster} />
        </p>
      </Column>
      <Column large="9">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
      </Column>
    </Row>
  );

  const jsxTemplate = (
    <Wrapper style={{ background: '#fff' }}>
      <Container style={{ width: 598 }}>
        {layout.map((row) => {
          console.log(row);
          return layout_2;
        })}
      </Container>
    </Wrapper>
  );

  const renderedMarkup = renderToStaticMarkup(
    <div>
      {jsxTemplate}
    </div>
  );

  return (
    <div
      style={{ background: '#b8b8b8' }}
      dangerouslySetInnerHTML={{__html: renderedMarkup}}
      >
    </div>
  )
}

export default RenderPanel;
