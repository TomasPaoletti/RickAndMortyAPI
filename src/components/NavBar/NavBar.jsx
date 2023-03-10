import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../reducers/UserExtraReducer';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    };

    if (user != null) {
        return <Navbar>
            <Container fluid>
                <NavbarCollapse className="justify-content-between">
                    <Navbar.Text>
                        {user.displayName || user.email}
                    </Navbar.Text>
                    <Button onClick={() => handleLogout()}>Cerrar sesión</Button>
                </NavbarCollapse>
            </Container>
        </Navbar>
    };

    return (
        <Navbar>
            <Container fluid>
                <NavbarCollapse className="justify-content-end">
                    <Link to="/login">
                        <Navbar.Text>
                            Iniciar sesión
                        </Navbar.Text>
                    </Link>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}