import React from 'react';
import Inky, { Button, Container, Row, Column } from 'react-inky';
import Showtimes from './Showtimes';
import { find } from 'lodash';
import { renderToStaticMarkup } from 'react-dom/server';
import { useFetchOPosts } from './useFetch'
import './RenderPanel.css'

const RenderPanel = ({ layout, callbackFromParent }) => {
  const response = useFetchOPosts();

  const generateModule = (obj) => {
    const movie = find(response.events, {
      'id': parseInt(obj.movieId, 10)
    });
    return (
      <Row>
        <Column large="6">
          <p>
            <img src={movie.image.sizes["poster-full"].url} />
          </p>
          <small dangerouslySetInnerHTML={{__html: movie.event_reviews}}>
          </small>
        </Column>
        <Column>
          <h1>{movie.title}</h1>
          <div dangerouslySetInnerHTML={{__html: movie.description}}>
          </div>
          {movie.event_showtimes
            ? <Showtimes showtimes={movie.event_showtimes} />
            : ''}
          <Button className="large expand" href="#">
            Buy tickets
          </Button>
        </Column>
      </Row>
    );
  }

  const jsxTemplate = (
    <Container>
      {layout.map((row) => generateModule(row))}
    </Container>
  );

  const renderedMarkup = renderToStaticMarkup(
    <>
      {jsxTemplate}
    </>
  );

  const htmlMarkup = renderToStaticMarkup(
    <Inky>
      <Inky.Head>
        <style></style>
      </Inky.Head>
      <Inky.Body>
        {jsxTemplate}
      </Inky.Body>
    </Inky>
  );

  // this should have the "true" HTML markup whatever that means
  callbackFromParent(htmlMarkup);

  return (
    <div
      dangerouslySetInnerHTML={{__html: renderedMarkup}}
      >
    </div>
  )
}

export default RenderPanel;
