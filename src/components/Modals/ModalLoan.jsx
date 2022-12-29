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
import "./Modals.css"

function modalLoan() {

    const { modalLoan, handleCloseModalLoan, getLoan, modalId } = useAuth();
    const [price, setPrice] = useState({
        "loan": ""
    });

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleLoan = async () => {
        await getLoan(parseInt(price.loan), modalId)
        handleCloseModalLoan()
        setPrice({
            "loan": ""
        })
    };

    return (
        <Modal show={modalLoan}>
            <ModalHeader>
                <ModalTitle>
                    Solicitar prestamo
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <FormLabel htmlFor='loan'>Dinero a solicitar</FormLabel>
                    <FormControl
                        id='loan'
                        type='number'
                        name="loan"
                        value={price.loan}
                        onChange={priceChange}
                        min="0" />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button variant='primary' onClick={handleLoan}>Solicitar</Button>
                <Button variant='secondary' onClick={handleCloseModalLoan}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default modalLoan