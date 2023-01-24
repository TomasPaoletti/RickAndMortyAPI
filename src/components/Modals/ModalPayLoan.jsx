import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { handleCloseModalPayLoan } from '../../reducers/modalSlice'
import { getPayLoan } from '../../reducers/actionsSlice';
import "./Modals.css";

function ModalPayLoan() {

    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal.payLoan)
    const id = useSelector(state => state.modal.id)

    const [price, setPrice] = useState({
        "payLoan": ""
    });

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handlePayLoan = () => {
        const data = {
            price: parseInt(price.payLoan),
            id: id
        }
        dispatch(getPayLoan(data))
        dispatch(handleCloseModalPayLoan())
        setPrice({
            "payLoan": ""
        })
    };

    return (
        <Modal show={modal}>
            <ModalHeader>
                <ModalTitle>
                    Pagar préstamo
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <FormLabel htmlFor='payLoan'>Dinero que desea pagar</FormLabel>
                    <FormControl
                        id='payLoan'
                        type='number'
                        name="payLoan"
                        value={price.payLoan}
                        onChange={priceChange}
                        min="0" />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button variant='primary' onClick={handlePayLoan}>Pagar</Button>
                <Button variant='secondary' onClick={() => dispatch(handleCloseModalPayLoan())}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalPayLoan