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
import { handleCloseModalWithdraw } from '../../reducers/modalSlice'
import { getWithdraw } from '../../reducers/actionsSlice';
import "./Modals.css";

function ModalWithdraw() {

    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal.withdraw)
    const id = useSelector(state => state.modal.id)

    const [price, setPrice] = useState({
        "withdraWals": ""
    });

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleWithdraw = () => {
        const data = {
            price: parseInt(price.withdraWals),
            id: id
        }
        dispatch(getWithdraw(data))
        dispatch(handleCloseModalWithdraw())
        setPrice({
            "withdraWals": ""
        })
    };

    return (
        <Modal show={modal}>
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
                <Button variant='secondary' onClick={() => dispatch(handleCloseModalWithdraw())}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalWithdraw