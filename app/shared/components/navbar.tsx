'use client';
import React from 'react';
import styles from './navbar.module.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export const NavBar = () => {
    return (
        <div className={styles.absolute}>
            <div className={styles.backgroundContainer}>
                <div className={styles.logoBackground}></div>
                <div className={styles.background}></div>
            </div>
            
            <Navbar collapseOnSelect expand="lg" className={styles.zIndex}>
                <Navbar.Brand href="/" className={styles.logoLink} ></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/break">Break Page</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}