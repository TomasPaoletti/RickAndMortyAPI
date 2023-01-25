import React, { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsArrowLeftRight } from "react-icons/bs";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaMoneyBill } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../../API/index';
import ActionButtons from './ActionButtons';
import ModalDeposit from '../Modals/ModalDeposit';
import ModalTransfer from '../Modals/ModalTransfer';
import ModalWithdraw from '../Modals/ModalWithdraw';
import ModalLoan from '../Modals/ModalLoan';
import ModalPayLoan from '../Modals/ModalPayLoan';
import Loader from '../Loader/Loader';
import {
    handleShowModalDeposit,
    handleShowModalTransfer,
    handleShowModalWithdraw,
    handleShowModalLoan,
    handleShowModalPayLoan
} from '../../reducers/modalSlice'


function AvailableUsers() {

    const dispatch = useDispatch()
    const list = useSelector(state => state.actions.list)

    useEffect(() => {
        dispatch(getCharacters())
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
                                            onClick={() => dispatch(handleShowModalDeposit(item.id))}>
                                            <AiOutlineArrowDown />
                                        </ActionButtons>
                                        <ActionButtons
                                            variant="secondary"
                                            title="Transferencia"
                                            onClick={() => dispatch(handleShowModalTransfer(item.id))}>
                                            <BsArrowLeftRight />
                                        </ActionButtons>
                                        <ActionButtons
                                            variant="light"
                                            title='Retirar dinero'
                                            onClick={() => dispatch(handleShowModalWithdraw(item.id))}>
                                            <GiReceiveMoney />
                                        </ActionButtons>
                                        <ActionButtons
                                            variant="dark"
                                            title='Pedir préstamo'
                                            onClick={() => dispatch(handleShowModalLoan(item.id))}
                                        >
                                            <FaMoneyBill />
                                        </ActionButtons>
                                        <ActionButtons
                                            variant="info"
                                            title='Pagar préstamo'
                                            onClick={() => dispatch(handleShowModalPayLoan(item.id))}
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