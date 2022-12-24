import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AvailableUsers() {

    const { list, userList } = useAuth();

    useEffect(() => {
        userList()
    }, [])

    if (list == null) {
        return <h1>cargando</h1>
    }
    
    return (
        <>
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
                    {list.map((item) => {
                        return <tr className='text-center' key={item.id}>
                            <td>{item.name}</td>
                            <td>€{item.montoInicial + item.prestamoPedido}</td>
                            <td>€{item.prestamoPedido}</td>
                            <td>
                                <Row className='pb-1'>
                                    <Col>
                                        <Link to={`/${item.id}`}>
                                            <Button size="sm">Realizar movimientos</Button>                                        </Link>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default AvailableUsers