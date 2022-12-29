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

function ModalWithdraw() {

    const { modalWithdraw, handleCloseModalWithdraw, getWithdraw, modalId } = useAuth();
    const [price, setPrice] = useState({
        "withdraWals": ""
    });

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleWithdraw = async () => {
        await getWithdraw(parseInt(price.withdraWals), modalId)
        handleCloseModalWithdraw()
        setPrice({
            "withdraWals": ""
        })
    };

    return (
        <Modal show={modalWithdraw}>
            <ModalHeader>
                <ModalTitle>
                    Retirar dinero
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <FormLabel htmlFor='withdraWals'>Dinero que desea retirar</FormLabel>
                    <FormControl
                        id='withdraWals'
                        type='number'
                        name="withdraWals"
                        value={price.withdraWals}
                        onChange={priceChange}
                        min="0" />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button variant='primary' onClick={handleWithdraw}>Retirar</Button>
                <Button variant='secondary' onClick={handleCloseModalWithdraw}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalWithdraw