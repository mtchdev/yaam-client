import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

export default class TopBar extends Component {
    render() {
        return (
            <Navbar type="dark" theme="white" expand="md" style={style}>
                <NavbarBrand style={{color: 'darkBlue'}}>Yet Another Airplane Map</NavbarBrand>
                <Nav navbar>
                </Nav>
            </Navbar>
        )
    }
}


const style = {
    paddingBottom: 0,
    paddingTop: 0,
    height: '6vh',
    boxShadow: '10px 0px 10px 0px rgba(0,0,0,0.1)',
    zIndex: 12000,
}