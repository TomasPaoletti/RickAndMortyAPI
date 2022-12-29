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
import { useAuth } from '../../context/AuthContext';
import "./Modals.css";

function ModalPayLoan() {

    const { modalPayLoan, handleCloseModalPayLoan, getPayLoan, modalId } = useAuth();
    const [price, setPrice] = useState({
        "payLoan": ""
    });

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handlePayLoan = async () => {
        await getPayLoan(parseInt(price.payLoan), modalId)
        handleCloseModalPayLoan()
        setPrice({
            "payLoan": ""
        })
    };

    return (
        <Modal show={modalPayLoan}>
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
                <Button variant='secondary' onClick={handleCloseModalPayLoan}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalPayLoan