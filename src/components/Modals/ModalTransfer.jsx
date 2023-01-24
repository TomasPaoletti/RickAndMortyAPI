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
import { useSelector, useDispatch } from 'react-redux';
import { handleCloseModalTransfer } from '../../reducers/modalSlice'
import { getTransfer } from '../../reducers/actionsSlice';
import "./Modals.css";

function ModalTransfer() {

    const dispatch = useDispatch()
    const list = useSelector(state => state.actions.list)
    const modal = useSelector(state => state.modal.transfer)
    const id = useSelector(state => state.modal.id)

    const [price, setPrice] = useState({
        "montoTransferir": "",
        "idTransfer": "",
    });

    let buttonDisabled = !price.idTransfer || !price.montoTransferir;

    const priceChange = ({ target: { name, value } }) => {
        setPrice(currentValue => ({
            ...currentValue,
            [name]: value,
        }))
    };

    const handleTransfer = () => {
        const data = {
            price: parseInt(price.montoTransferir),
            id: id,
            idTransfer: parseInt(price.idTransfer)
        }
        dispatch(getTransfer(data))
        dispatch(handleCloseModalTransfer())
        setPrice({
            "montoTransferir": "",
            "idTransfer": ""
        })
    };

    return (
        <Modal show={modal}>
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
                        name='idTransfer'
                        value={price.idTransfer}
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
                <Button variant='secondary' onClick={() => dispatch(handleCloseModalTransfer())}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalTransfer