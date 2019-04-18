import React from 'react';

import { Row, Col } from 'reactstrap';

import Page from 'components/Page';

import { iconD3Data, numberD3Data } from 'demos/D3Page';

const D3Page = () => {
  return (
    <Page
      className="D3Page"
      title="D3s"
      breadcrumbs={[{ name: 'D3s', active: true }]}
    >
      <Row>
        {numberD3Data.map(({ color }, index) => (
          <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
           
          </Col>
        ))}
      </Row>

      <Row>
        {iconD3Data.map(
          ({ bgColor, icon, title, subtitle, ...restProps }, index) => (
            <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
            
            </Col>
          )
        )}
      </Row>
    </Page>
  );
};

export default D3Page;
