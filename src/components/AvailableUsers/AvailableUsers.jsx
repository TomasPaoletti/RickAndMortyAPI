import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

function AvailableUsers() {

    const { jsonState } = useAuth();
    const [list, setList] = useState();

    const userList = () => {
        const response = JSON.parse(jsonState)
        setList(response)
    }

    useEffect(() => {
        userList()
    }, [])

    if (list === undefined) {
        return <h1>cargando</h1>
    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dinero en cuenta</th>
                        <th>Prestamo pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item) => {
                        return <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.montoInicial + item.prestamoPedido}</td>
                            <td>{item.prestamoPedido}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default AvailableUsers