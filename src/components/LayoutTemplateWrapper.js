import React from 'react';
import Inky, { Container, Spacer, Center, Row, Column } from 'react-inky';
import Showtimes from './Showtimes';
import './LayoutTemplateWrapper.scss';

const LayoutTemplateWrapper = obj => {
  const {
    id, posterurl, layout, content, htmldescription, htmlquotes, showtimes
  } = obj.item
  console.log(layout)
  switch (layout) {
    case 'header':
      return (
        <Container>
          <Row>
            <Column large="12">
                <Center>
                  <img src="http://botshigh.com/wp-content/uploads/2011/04/o_cinema_logo_blk-wht_small_grayscale.jpg" width="100" />
                </Center>
            </Column>
          </Row>
        </Container>
      )
    case 'footer':
      return (
        <Container>
          <Row>
            <Column large="12">
              <p><small>O Cinema<br/>500 71 Street, Miami Beach FL 33141<br />
              You received this email because you're signed up to get updates from us. <a href="#">Click here to unsubscribe.</a></small></p>
            </Column>
          </Row>
        </Container>
      )
    default:
      return (
        <Container>
          <Row>
            <Column large="4">
              {posterurl && <img alt="Poster thumbnail" src={posterurl} />}
              <div dangerouslySetInnerHTML={{__html: htmlquotes}} />
            </Column>
            <Column large="8">
              <h1>{content}</h1>
              <div dangerouslySetInnerHTML={{__html: htmldescription}} />
              {showtimes && (showtimes.length > 0) && <Showtimes showtimes={showtimes} />}
            </Column>
          </Row>
        </Container>
      );
  }
}

export default LayoutTemplateWrapper;
