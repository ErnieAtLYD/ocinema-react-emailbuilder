import React from 'react';
import { Wrapper, Spacer, Button, Container, Callout, Center, Row, Column } from 'react-inky';
import Showtimes from './Showtimes';
import '../styles/newsletter.scss';

const LayoutTemplateWrapper = obj => {
  const {
    agileurl, bannerurl, posterurl, layout, content, htmldescription, htmlquotes, showtimes
  } = obj.item
  switch (layout) {
    case 'header':
      return (
        <>
          <Spacer size="8">
          </Spacer>
          <Row>
            <Column large="8">
              Your favorite independent cinema is bringing ﻿you more of the kind of movies you love.
            </Column>
            <Column large="4">
              <img src="https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/tw.png" style={{display:'inline', margin:4}} />
              <img src="https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/fb.png" style={{display:'inline', margin:4}} />
              <img src="https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/ig.png" style={{display:'inline', margin:4}} />
            </Column>
          </Row>
          <Container>
            <Row>
              <Column large="12">
                  <Center>
                    <img src="https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/o-logo-mailcampaign.jpg" style={{ width: 100 }} />
                  </Center>
              </Column>
            </Row>
          </Container>
        </>
      )
    case 'full-bleed-wrapper-2':
      return (
        <Wrapper className="full-bleed-wrapper-2">
          <Container>
            <Row className="collapse">
              <Column small="12">
                {bannerurl && <img src={bannerurl} />}
              </Column>
            </Row>
            {htmldescription &&
              <Row>
                <Column small="12">
                <div dangerouslySetInnerHTML={{__html: htmldescription}} />
                </Column>
              </Row>}
          </Container>
        </Wrapper>
      )
    case 'full-bleed-wrapper':
      return (
        <Container>
          <Row className="collapse">
            <Column small="12">
              <Wrapper style={{backgroundColor: '#ed008c'}}>
                <h3 className="text-center" style={{marginTop: 10, color: '#fff', fontWeight: 'bold'}}>
                  NEXT WEEK
                </h3>
              </Wrapper>
            </Column>
          </Row>
        </Container>
      )
    case 'section-break':
      return (
        <Spacer size="16">
        </Spacer>
      )
    case 'membership-drive':
      return (
        <Container>
          <Callout className="secondary">
            <h2>Support O Cinema <small>Become a member</small></h2>
            <div dangerouslySetInnerHTML={{__html: htmldescription}} />
            <Spacer size="16"></Spacer>
            <Center>
              <Button href={posterurl}>
                Join now
              </Button>
            </Center>
          </Callout>
        </Container>
      )
    case 'footer':
      return (
          <Row>
            <Column large="12" className="newsletter-footer">
              <p>
                O Cinema<br/>500 71 Street, Miami Beach FL 33141 (Mailing address)<br />
                You received this email because you signed up to get updates
                from us. <a href="#">Click here to unsubscribe.</a>
              </p>
            </Column>
          </Row>
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
            </Column>
          </Row>
          {showtimes && (showtimes.length > 0) &&
            <Row>
              <Column large="12">
                <Showtimes showtimes={showtimes} />
                {agileurl &&
                  <Button
                    className="expanded"
                    href={agileurl}>
                    Purchase Tickets
                  </Button>
                }
              </Column>
            </Row>
          }
        </Container>
      );
  }
}

export default LayoutTemplateWrapper;
