import React, { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsArrowLeftRight } from "react-icons/bs";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaMoneyBill } from "react-icons/fa";
import ActionButtons from './ActionButtons';
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
    }, []);

    if (list == null) {
        return <Loader />
    };

    return (
        <>
            <h1 className='text-center'>Usuarios disponibles</h1>
            <Table bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>Nombre</th>
                        <th>Dinero en cuenta</th>
                        <th>Préstamo pedido</th>
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
                                        <ActionButtons
                                            variant="primary"
                                            title="Consignación"
                                            onClick={() => handleShowModalDeposit(item.id)}>
                                            <AiOutlineArrowDown />
                                        </ActionButtons>
                                        <ActionButtons
                                            variant="secondary"
                                            title="Transferencia"
                                            onClick={() => handleShowModalTransfer(item.id)}>
                                            <BsArrowLeftRight />
                                        </ActionButtons>
                                        <ActionButtons
                                            variant="light"
                                            title='Retirar dinero'
                                            onClick={() => handleShowModalWithdraw(item.id)}>
                                            <GiReceiveMoney />
                                        </ActionButtons>
                                        <ActionButtons
                                            variant="dark"
                                            title='Pedir préstamo'
                                            onClick={() => handleShowModalLoan(item.id)}
                                        >
                                            <FaMoneyBill />
                                        </ActionButtons>
                                        <ActionButtons
                                            variant="info"
                                            title='Pagar préstamo'
                                            onClick={() => handleShowModalPayLoan(item.id)}
                                        >
                                            <GiPayMoney />
                                        </ActionButtons>
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