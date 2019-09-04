import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, FormInput, Button, InputGroup, InputGroupAddon, InputGroupText } from "shards-react";

class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             searchValue: "",
             searchResults: []
        }
    }
    
    render() {
        return (
          <InputGroup size="md">
            <InputGroupAddon type="prepend">
              <InputGroupText>{/* Search Icon */}</InputGroupText>
            </InputGroupAddon>
            <FormInput placeholder="Search..." onChange={(e) => this.setState({searchValue: e.target.value})} value={this.state.searchValue}/>
          </InputGroup>
        );
    }

    componentDidUpdate() {
        const { allStations } = this.props;
        const { searchValue } = this.state;
        this.setState({searchResults: searchInStations(allStations, searchValue)});
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.searchResults === nextState.searchResults) return false;
        return true;
    }
}
const mapStateToProps = (state) => ({
    allStations: [...state.allAircraft.pilots, ...state.allAircraft.atc]
})

const searchInStations = (stations, searchValue) => {
    if (stations && searchValue.length >= 2) {   
        return stations.filter((station) => {
            const callsign = station.callsign.toLowerCase() 
            if(callsign.includes(searchValue)) return true;
        });
    } else {
        return [];
    }
}

export default connect(mapStateToProps, null)(Search)

