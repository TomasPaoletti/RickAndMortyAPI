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
import { handleCloseModalDeposit } from '../../reducers/modalSlice'
import { getCredit } from '../../reducers/actionsSlice';
import "./Modals.css";

function ModalDeposit() {

    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal.deposit)
    const id = useSelector(state => state.modal.id)
    const [price, setPrice] = useState({
        "montoInicial": ""
    });

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleDeposit = () => {
        const data = {
            price: parseInt(price.montoInicial),
            id: id
        }
        dispatch(getCredit(data))
        dispatch(handleCloseModalDeposit())
        setPrice({
            "montoInicial": ""
        })

    };


    return (
        <>
            <Modal show={modal}>
                <ModalHeader>
                    <ModalTitle>
                        Acreditar dinero
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <FormLabel htmlFor='montoInicial'>Dinero a depositar</FormLabel>
                        <FormControl
                            type='number'
                            id='montoInicial'
                            name="montoInicial"
                            value={price.montoInicial}
                            onChange={priceChange}
                            min="0" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button variant='primary' onClick={handleDeposit}>Acreditar</Button>
                    <Button variant='secondary' onClick={() => dispatch(handleCloseModalDeposit())}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ModalDeposit