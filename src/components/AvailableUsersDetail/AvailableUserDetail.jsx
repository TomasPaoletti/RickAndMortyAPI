import React, { useEffect } from 'react'
import { Col, Container, Row, Button, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsArrowLeftRight } from "react-icons/bs";
import ModalTransfer from '../Modals/ModalTransfer';
import ModalDeposit from '../Modals/ModalDeposit';

function AvailableUserDetail() {

    const { id } = useParams()
    const { getUserDetail, userDetail, handleShowModalTransfer, handleShowModalDeposit } = useAuth();

    useEffect(() => {
        getUserDetail(id)
    }, [])

    if (userDetail == null) {
        return <h1>cargando</h1>
    }
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col sm={6}>
                    <h1 className='text-center'>Acciones</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm={8}>
                    <Table bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <th>Nombre</th>
                                <th>Dinero en cuenta</th>
                                <th>Prestamo pedido</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center">
                                <td>{userDetail.name}</td>
                                <td>€{userDetail.montoInicial}</td>
                                <td>€{userDetail.prestamoPedido}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        title='Consignacion'
                                        size="sm"
                                        onClick={handleShowModalDeposit}
                                    >
                                        <AiOutlineArrowDown />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        title='Transferencia'
                                        size="sm"
                                        onClick={handleShowModalTransfer}
                                    >
                                        <BsArrowLeftRight />
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <ModalDeposit />
            <ModalTransfer />
        </Container>
    )
}

export default AvailableUserDetail