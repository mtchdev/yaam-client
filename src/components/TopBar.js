import React, { Component } from 'react'
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from "shards-react";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

export default class TopBar extends Component {
    render() {
        const { theme } = this.props;
        return (
            <Navbar expand="md" style={{...style, backgroundColor: theme.primary}}>
                <div style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                    <NavbarBrand style={{color: theme.textPrimary, flex: 1}}>Yet Another Airplane Map</NavbarBrand>
                    <Search />
                    <div style={{flex: 1}}></div>
                </div>
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