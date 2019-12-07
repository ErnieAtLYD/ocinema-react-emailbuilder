// @flow
import React from "react";
import { Container, Center, Spacer, Row, Column } from "react-inky";

const Header = (obj: LayoutWrapperType) => {
  const { item } = obj;
  return (
    <>
      <Spacer size="8"></Spacer>
      <Row>
        <Column large="8">
          <p dangerouslySetInnerHTML={{ __html: item.htmldescription }} />
        </Column>
        <Column large="4">
          <img
            alt="Twitter"
            src="https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/tw.png"
            style={{ display: "inline", margin: 4 }}
          />
          <img
            alt="Facebook"
            src="https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/fb.png"
            style={{ display: "inline", margin: 4 }}
          />
          <img
            alt="Instagram"
            src="https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/ig.png"
            style={{ display: "inline", margin: 4 }}
          />
        </Column>
      </Row>
      <Container>
        <Row>
          <Column large="12">
            <Center>
              <img
                alt="O Cinema"
                src="https://mangrove-labs-o-cinema.s3.amazonaws.com/email-assets/o-logo-mailcampaign.jpg"
                style={{ width: 100 }}
              />
            </Center>
          </Column>
        </Row>
      </Container>
    </>
  );
};

export default Header;
