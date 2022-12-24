import React, { useState } from 'react';
import { Button, FormControl, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ModalDeposit() {

    const { modalDeposit, handleCloseModalDeposit, getMontoInicial } = useAuth();
    const [price, setPrice] = useState({
        "montoInicial": ""
    })
    const navigate = useNavigate()
    const {id} = useParams()
    

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleDeposit = async () => {
        await getMontoInicial(price.montoInicial, id)
        handleCloseModalDeposit()
        navigate("/")
    }

    return (
        <Modal show={modalDeposit}>
            <ModalHeader>
                <ModalTitle>
                    Acreditar dinero
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
                    <Button variant='primary' onClick={handleDeposit}>Acreditar</Button>
                    <Button variant='secondary' onClick={handleCloseModalDeposit}>Cerrar</Button>
                </ModalFooter>
        </Modal>
    )
}

export default ModalDeposit