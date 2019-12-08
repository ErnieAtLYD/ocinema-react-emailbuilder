// @flow
import React from "react";
import { Container, Row, Column, Wrapper } from "react-inky";

const SectionHeader = (
  obj: LayoutWrapperType
): React$Element<typeof Container> => {
  const { item } = obj;
  return (
    <Container>
      <Row className="collapse">
        <Column small="12">
          <Wrapper style={{ backgroundColor: "#ed008c" }}>
            <h3
              className="text-center"
              style={{
                textTransform: "uppercase",
                marginTop: 10,
                color: "#fff",
                fontWeight: "bold"
              }}
            >
              {item.content}
            </h3>
          </Wrapper>
        </Column>
      </Row>
    </Container>
  );
};

export default SectionHeader;
