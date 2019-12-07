// @flow
import React from "react";
import { Row, Column } from "react-inky";

const Footer = () => (
  <Row>
    <Column large="12" className="newsletter-footer">
      <p>
        O Cinema
        <br />
        500 71 Street, Miami Beach FL 33141 (Mailing address)
        <br />
        You received this email because you signed up to get updates from us.{" "}
        <a href="#">Click here to unsubscribe.</a>
      </p>
    </Column>
  </Row>
);

export default Footer;
