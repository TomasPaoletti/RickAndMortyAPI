import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import './Register.css'


function Register() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
    });

    const handleChange = ({ target: { name, value } }) => {
        setUser(currentValue => ({
            ...currentValue,
            [name]: value
        }))
    };

    const handleRegister = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            await register(user.email, user.password)
            setLoading(false)
            navigate("/")
            Toast.fire({
                title: "Registrado correctamente",
                icon: "success",
            })
        } catch (error) {
            setLoading(false)
            if (error.code === "auth/email-already-in-use") {
                setError("Este correo ya está registrado")
            }
        }
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