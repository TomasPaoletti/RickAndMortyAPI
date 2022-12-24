import React, { useState } from 'react';
import { Button, Form, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

function ModalTransfer() {

    const { modalTransfer, handleCloseModalTransfer } = useAuth();
    const [price, setPrice] = useState({
        "montoInicial": ""
    })

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    return (
        <Modal show={modalTransfer}>
            <ModalHeader>
                <ModalTitle>
                    Transferir dinero
                </ModalTitle>
            </ModalHeader>
            <Form>
                <ModalBody>
                    <FormControl
                        type='number'
                        name="montoInicial"
                        value={price.montoInicial}
                        onChange={priceChange}
                        min="0" />
                </ModalBody>
                <ModalFooter>
                    <Button variant='primary' onClick={handleCloseModalTransfer}>Cerrar</Button>
                    <Button variant='secondary' onClick={handleCloseModalTransfer}>Cerrar</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default ModalTransfer