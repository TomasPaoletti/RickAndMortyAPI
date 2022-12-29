import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { DotSpinner } from '@uiball/loaders';

export default function Loader() {
    return (
        <Container fluid>
            <Row className="justify-content-center p-5">
                <Col sm={1}>
                    <DotSpinner
                        size={80}
                        speed={0.9}
                        color="#0C6291"
                    />
                </Col>
            </Row>
        </Container>
    )
}