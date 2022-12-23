import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState()

    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await login(user.email, user.password)
            navigate("/")
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                setError("Contrseña incorrecta")
            }
            if (error.code === "auth/user-not-found") {
                setError("Correo incorrecto")
            }
        }
    }

    const handleGoogle = async (e) => {
        e.preventDefault()
        await loginWithGoogle()
        navigate("/")
    };

    return (
        <Container>
            <Row className="justify-content-center py-5">
                <Col sm={6} className='wrapper_register'>
                    <h2 className='text-center pt-3'>Iniciar sesión</h2>
                    {error && <p>{error}</p>}
                    <Form onSubmit={handleRegister}>
                        <Form.Group className='pb-3'>
                            <Form.Label>Correo electronico</Form.Label>
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
                                <Link to="/register">Crear una cuenta</Link>
                            </Col>
                        </Row>
                        <Row className="p-3">
                            <Col>
                                <Button type='submit'>Iniciar sesión</Button>
                            </Col>
                            <Col>
                                <Button onClick={(e) => handleGoogle(e)}>Iniciar con google</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login