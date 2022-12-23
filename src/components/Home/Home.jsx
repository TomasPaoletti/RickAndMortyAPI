import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import AvailableUsers from '../AvailableUsers/AvailableUsers';

function Home() {

  const { loading, user } = useAuth();

  if (loading === true) {
    return <h1>Cargando...</h1>
  }

  if (user === null) {
    return <Container fluid>
      <Row className="justify-content-center">
        <Col>
          <h1>Inicia sesión para empezar a interactuar</h1>
        </Col>
      </Row>
    </Container>
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col sm={6}>
          <h1 className='text-center'>Usuarios disponibles</h1>
          <AvailableUsers />
        </Col>
      </Row>
    </Container>
  )
}

export default Home