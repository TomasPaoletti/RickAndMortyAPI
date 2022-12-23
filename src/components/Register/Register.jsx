import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Register.css'


function Register() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState()

    const {register, loginWithGoogle} = useAuth();
    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await register(user.email, user.password)
            navigate("/")
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setError("Este correo ya esta registrado")
            }
        }
    }
    const handleLogout = () => {
        auth.logout()
    };

    return (
        <Container>
            <Row className="justify-content-center py-5">
                <Col sm={6} className='wrapper_register'>
                    <h2 className='text-center pt-3'>Registrarse</h2>
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