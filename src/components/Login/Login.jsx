import React, { useState } from 'react';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginWithGoogle } from '../../reducers/UserExtraReducer';
import { FcGoogle } from "react-icons/fc";
import Loader from '../Loader/Loader';
import "./Login.css"

function Login() {

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

    const handleLogin = async (e) => {
        e.preventDefault()
        await dispatch(login(user))
        navigate("/")
    };

    const handleGoogle = async (e) => {
        e.preventDefault()
        await dispatch(loginWithGoogle())
        navigate("/")
    };

    if (loading === true) {
        return <Loader />
    };

    return (
        <Container>
            <Row className="justify-content-center py-5">
                <Col md={5} xs={8} lg={3} className='wrapper_login'>
                    <h2 className='text-center pt-3'>Iniciar sesión</h2>
                    {error && <p className='error'>{error}</p>}
                    <Form onSubmit={handleLogin}>
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
                        <Row>
                            <Col>
                                <Link to="/register">Crear cuenta</Link>
                            </Col>
                        </Row>
                        <Row className="py-3">
                            <Col xs={6}>
                                <Button variant='primary' type='submit'>Iniciar sesión</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Iniciar sesión con redes</p>
                            </Col>
                        </Row>
                        <Row className="pb-1">
                            <Col xs={3}>
                                <FcGoogle
                                    className='google'
                                    size={35}
                                    onClick={(e) => handleGoogle(e)}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login