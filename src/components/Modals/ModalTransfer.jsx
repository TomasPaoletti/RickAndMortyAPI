import React, { useState } from 'react';
import { Button, Form, FormControl, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import "./Modals.css"

function ModalTransfer() {

    const { modalTransfer, handleCloseModalTransfer, modalId, list, getTransfer } = useAuth();
    const [price, setPrice] = useState({
        "montoTransferir": "",
        "id": "1"
    })

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleTransfer = async () => {
        await getTransfer(price.montoTransferir, price.id, modalId)
        handleCloseModalTransfer()
        setPrice({
            "montoTransferir": "",
            "id": "1"
        })
    }
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
                        name="montoTransferir"
                        value={price.montoTransferir}
                        onChange={priceChange}
                        min="0" />
                    <FormSelect
                        size="sm"
                        name='id'
                        value={price.id}
                        onChange={priceChange}
                    >
                        {list.map((item) => {
                            return <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        })}
                    </FormSelect>
                </ModalBody>
                <ModalFooter>
                    <Button variant='primary' onClick={handleTransfer}>Transferir</Button>
                    <Button variant='secondary' onClick={handleCloseModalTransfer}>Cerrar</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default ModalTransfer