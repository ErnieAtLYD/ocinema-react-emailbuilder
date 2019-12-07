// @flow
import React from "react";
import { Callout, Button, Container, Center, Spacer } from "react-inky";

const TemplateMembership = (obj: LayoutWrapperType) => {
  const { item } = obj;
  return (
    <Container>
      <Callout className="secondary">
        <h2>
          Support O Cinema <small>Become a member</small>
        </h2>
        <div dangerouslySetInnerHTML={{ __html: item.htmldescription }} />
        <Spacer size="16"></Spacer>
        <Center>
          <Button href={item.ctaurl}>{item.ctalabel}</Button>
        </Center>
      </Callout>
    </Container>
  );
};

export default TemplateMembership;
