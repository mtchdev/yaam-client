import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from "shards-react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import MapContainer from './MapContainer';

class MainContainer extends Component {
    render() {
        return (
            <Container fluid style={{padding: 0, height: '100vh'}}>
                <Row noGutters>
                    <Col md="12">
                        <TopBar height="5vh"></TopBar>
                    </Col>
                </Row>
                <Sidebar/>
                <Row noGutters style={{height: '94vh'}}>  
                    <Col>
                        <MapContainer />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer)