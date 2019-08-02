import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

export default class TopBar extends Component {
    render() {
        return (
            <Navbar type="dark" theme="white" expand="md" style={style}>
                <NavbarBrand style={{color: 'darkBlue'}}>Yet Another VATSIM Map</NavbarBrand>
                <Nav navbar>
                    <NavItem>
                        <NavLink active style={{color: 'darkBlue'}}>
                            Main Page
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}


const style = {
    paddingBottom: 0,
    paddingTop: 0,
    height: '6vh'
}