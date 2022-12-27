import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './NavBar.css'

export default function NavBar() {

    const { user, logout } = useAuth();
    
    const handleLogout = () => {
        logout()
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
    }
    return (
        <Navbar>
            <Container fluid>
                <NavbarCollapse className="justify-content-end">
                    <Link to="/login">
                        <Navbar.Text>
                            Iniciar sesion
                        </Navbar.Text>
                    </Link>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}