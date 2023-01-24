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
import { handleCloseModalLoan } from '../../reducers/modalSlice'
import { getCredit, getLoan } from '../../reducers/actionsSlice';
import "./Modals.css";

function modalLoan() {

    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal.loan)
    const id = useSelector(state => state.modal.id)

    const [price, setPrice] = useState({
        "loan": ""
    });

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleLoan = () => {
        const data = {
            price: parseInt(price.loan),
            id: id
        }
        dispatch(getLoan(data))
        dispatch(handleCloseModalLoan())
        setPrice({
            "loan": ""
        })
    };

    return (
        <Modal show={modal}>
            <ModalHeader>
                <ModalTitle>
                    Solicitar préstamo
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
                <Button variant='secondary' onClick={() => dispatch(handleCloseModalLoan())}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default modalLoan