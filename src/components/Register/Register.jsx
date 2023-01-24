import React, { useState } from 'react';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../reducers/UserExtraReducer';
import Loader from '../Loader/Loader';
import './Register.css'


function Register() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const error = useSelector(state => state.user.error)
    const loading = useSelector(state => state.user.loading)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = ({ target: { name, value } }) => {
        setUser(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(register(user))
        navigate("/")
    };

    if (loading === true) {
        return <Loader />
    };

    return (
        <Container>
            <Row className="justify-content-center py-5">
                <Col md={5} xs={8} lg={3} className='wrapper_register'>
                    <h2 className='text-center pt-3'>Registrarse</h2>
                    {error && <p>{error}</p>}
                    <Form onSubmit={handleRegister}>
                        <Form.Group className='pb-3'>
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <FormGroup className='pb-3'>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl
                                type='password'
                                name='password'
                                onChange={handleChange}
                                required
                                minLength="6"
                            />
                        </FormGroup>
                        <Row className="justify-content-center pb-3">
                            <Col>
                                <Button type='submit'>Registrarse</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register