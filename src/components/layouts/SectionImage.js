// @flow
import React from "react";
import { Container, Row, Column, Wrapper } from "react-inky";

const SectionImage = (
  obj: LayoutWrapperType
): React$Element<typeof Wrapper> => {
  const { item } = obj;
  return (
    <Wrapper className="full-bleed-wrapper-2">
      <Container>
        <Row className="collapse">
          <Column small="12">
            {item.bannerurl && <img alt="" src={item.bannerurl} />}
          </Column>
        </Row>
        {item.htmldescription && (
          <Row>
            <Column small="12">
              <div dangerouslySetInnerHTML={{ __html: item.htmldescription }} />
            </Column>
          </Row>
        )}
      </Container>
    </Wrapper>
  );
};

export default SectionImage;
