import React, { useState } from 'react';
import { Button, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import "./Modals.css"

function ModalWithdraw() {

    const { modalWithdraw, handleCloseModalWithdraw, getWithdraw, modalId } = useAuth();
    const [price, setPrice] = useState({
        "montoInicial": ""
    })

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleWithdraw = async () => {
        await getWithdraw(price.montoInicial, modalId)
        handleCloseModalWithdraw()
        setPrice({
            "montoInicial": ""
        })
    }

    return (
        <Modal show={modalWithdraw}>
            <ModalHeader>
                <ModalTitle>
                    Retirar dinero
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <FormControl
                    type='number'
                    name="montoInicial"
                    value={price.montoInicial}
                    onChange={priceChange}
                    min="0" />
            </ModalBody>
            <ModalFooter>
                <Button variant='primary' onClick={handleWithdraw}>Acreditar</Button>
                <Button variant='secondary' onClick={handleCloseModalWithdraw}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalWithdraw