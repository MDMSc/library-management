import React, { useContext } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { ReducerContext } from '../context/ReducerContext'

export default function Home() {
  const {stateB, stateC, stateI} = useContext(ReducerContext);

  return (
    <Container className="main-container">
      <h1>Quick Inventory</h1>
      <br />
      <br />
      <Row className="d-flex align-items-center mb-5 inv_row_b">
        <Col>
          Total number of Books in Library
        </Col>
        <Col className='text-center'>
          {stateB.books.length}
        </Col>
      </Row>
      <Row className="d-flex align-items-center mb-5 inv_row_c">
        <Col>
          Total number of books Issued
        </Col>
        <Col className='text-center'>
        {stateI.issues.length}
        </Col>
      </Row>
      <Row className="d-flex align-items-center mb-5 inv_row_i">
        <Col>
          Total Customers added to Library
        </Col>
        <Col className='text-center'>
        {stateC.customers.length}
        </Col>
      </Row>
    </Container>
  )
}
