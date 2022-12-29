import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsArrowLeftRight } from "react-icons/bs";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaMoneyBill } from "react-icons/fa";
import ModalDeposit from '../Modals/ModalDeposit';
import ModalTransfer from '../Modals/ModalTransfer';
import ModalWithdraw from '../Modals/ModalWithdraw';
import ModalLoan from '../Modals/ModalLoan';
import ModalPayLoan from '../Modals/ModalPayLoan';
import Loader from '../Loader/Loader';

function AvailableUsers() {

    const { list,
        userList,
        handleShowModalDeposit,
        handleShowModalTransfer,
        handleShowModalWithdraw,
        handleShowModalLoan,
        handleShowModalPayLoan } = useAuth();

    useEffect(() => {
        userList()
    }, [])

    if (list == null) {
        return <Loader />
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
                            <td>€{item.montoInicial}</td>
                            <td>€{item.prestamoPedido}</td>
                            <td>
                                <Row>
                                    <Col>
                                        <Button
                                            className='m-1'
                                            variant="primary"
                                            title='Consignacion'
                                            size="sm"
                                            onClick={() => handleShowModalDeposit(item.id)}
                                        >
                                            <AiOutlineArrowDown />
                                        </Button>
                                        <Button
                                            className='m-1'
                                            variant="secondary"
                                            title='Transferencia'
                                            size="sm"
                                            onClick={() => handleShowModalTransfer(item.id)}
                                        >
                                            <BsArrowLeftRight />
                                        </Button>
                                        <Button
                                            className='m-1'
                                            variant="light"
                                            title='Retirar dinero'
                                            size="sm"
                                            onClick={() => handleShowModalWithdraw(item.id)}
                                        >
                                            <GiReceiveMoney />
                                        </Button>
                                        <Button
                                            className='m-1'
                                            variant="dark"
                                            title='Pedir prestamo'
                                            size="sm"
                                            onClick={() => handleShowModalLoan(item.id)}
                                        >
                                            <FaMoneyBill />
                                        </Button>
                                        <Button
                                            className='m-1'
                                            variant="info"
                                            title='Pagar prestamo'
                                            size="sm"
                                            onClick={() => handleShowModalPayLoan(item.id)}
                                        >
                                            <GiPayMoney />
                                        </Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <ModalDeposit />
            <ModalTransfer />
            <ModalWithdraw />
            <ModalLoan />
            <ModalPayLoan />
        </>
    )
}

export default AvailableUsers