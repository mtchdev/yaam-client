import React, { Component } from 'react'
import { Container, Row, Col } from "shards-react";
import Sidebar from "@components/Sidebar";
import TopBar from "@components/TopBar";
import MapContainer from './MapContainer';
import SidebarStyle from '../assets/css/Sidebar.css.js'

export default class MainContainer extends Component {
    render() {
        return (
            <Container fluid style={{padding: 0, height: '100vh'}}>
                <Row noGutters>
                    <Col md="12">
                        <TopBar height="5vh"></TopBar>
                    </Col>
                </Row>
                <Row noGutters style={{height: '94vh'}}>
                    <Col md="2" style={SidebarStyle.container}>
                        <Sidebar />
                    </Col>
                    <Col md="10">
                        <MapContainer />
                    </Col>
                </Row>
            </Container>
        )
    }
}
