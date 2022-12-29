import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    FormSelect,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle
} from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import "./Modals.css";

function ModalTransfer() {

    const { modalTransfer, handleCloseModalTransfer, modalId, list, getTransfer } = useAuth();
    const [price, setPrice] = useState({
        "montoTransferir": "",
        "id": "",
    });

    let buttonDisabled = !price.id || !price.montoTransferir;

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value,
        }))
    };

    const handleTransfer = async () => {
        await getTransfer(parseInt(price.montoTransferir), parseInt(price.id), modalId)
        handleCloseModalTransfer()
        setPrice({
            "montoTransferir": "",
            "id": ""
        })
    };

    return (
        <Modal show={modalTransfer}>
            <ModalHeader>
                <ModalTitle>
                    Transferir dinero
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <FormLabel htmlFor='montoTransferir'>Dinero a transferir</FormLabel>
                    <FormControl
                        id='montoTransferir'
                        type='number'
                        name="montoTransferir"
                        value={price.montoTransferir}
                        onChange={priceChange}
                        min="0" />
                </FormGroup>
                <FormGroup className='mt-2'>
                    <FormLabel htmlFor='user'>Usuario</FormLabel>
                    <FormSelect
                        id='user'
                        size="sm"
                        name='id'
                        value={price.id}
                        onChange={priceChange}
                    >
                        <option value="">Elegir usuario</option>
                        {list.map((item) => {
                            return <option
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </option>
                        })}
                    </FormSelect>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button variant='primary' onClick={handleTransfer} disabled={buttonDisabled}>Transferir</Button>
                <Button variant='secondary' onClick={handleCloseModalTransfer}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalTransfer