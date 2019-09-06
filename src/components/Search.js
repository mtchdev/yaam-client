import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, FormInput, Button, InputGroup, InputGroupAddon, InputGroupText, Dropdown, DropdownMenu, DropdownItem } from "shards-react";
import '../assets/css/search.css'
import fetchAircraftExtendedData from "../lib/focusOnAircraft";
import { unFocusAircraft } from "../redux/actions";
import { MdSearch } from "react-icons/md";

class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             searchValue: "",
             searchResults: []
        }
    }
    
    render() {
        const { searchResults, searchValue } = this.state;
        const { style, isDarkMode } = this.props;

        let dropdownMenuClass = isDarkMode ? 'dropdown-menu-dark' : '';
        let searchBarClass = isDarkMode ? 'searchBar-dark' : '';

        return (
          <div className="searchBar">
            <InputGroup size="md" className={searchBarClass}>
              <InputGroupAddon type="prepend">
                <InputGroupText><MdSearch /></InputGroupText>
              </InputGroupAddon>
              <FormInput
                placeholder="Search..."
                onChange={this.handleSearch}
                value={this.state.searchValue}
              />
            </InputGroup>
            {searchResults.length !== 0 && (
              <Dropdown open={true} toggle={() => this.setState({searchResults: []})}>
                <DropdownMenu size="md" className={dropdownMenuClass}>
                  {
                      searchResults.map((flight, index) => {
                          const {callsign, dep, arr, aircraft} = flight;
                          const depICAO = dep == null ? '' : dep.code == null ? '' : dep.code.icao == null ? '' : dep.code.icao
                          const arrICAO = arr == null ? '' : arr.code == null ? '' : arr.code.icao == null ? '' : arr.code.icao
                          // Took me a while to get the regex right, but what it basically does is remove all the slashes and stuff.
                          let formattedAircraft = aircraft == null ? null : aircraft.match(/(?:[\w\/])?([\d\w]{4})/);
                          
                          formattedAircraft = formattedAircraft == null ? '' : formattedAircraft[1]
                          const flightplanText = depICAO === '' && arrICAO === '' ? "No Flightplan" : `${depICAO} - ${arrICAO}`
                          
                        return (
                            <DropdownItem key={index} onClick={() => this.handleClick(callsign)} className="dropdown-item">
                                <div style={{display: "flex", justifyContent: 'space-between'}} className={"resultItem"}>
                                    <div style={{fontWeight: 'bold'}}>{callsign}</div>
                                    <div>{flightplanText}</div>
                                    <div>{formattedAircraft}</div>
                                </div>
                            </DropdownItem>
                        );
                      })
                  }

                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        );
    }

    handleSearch = (event) => {
        const { allStations } = this.props
        const searchValue = event.target.value;
        
        const searchResults = searchInStations(allStations, searchValue);
        this.setState({searchValue, searchResults})
    }

    handleClick = (callsign) => {
      this.props.unFocusAircraft()
      this.props.fetchAircraftExtendedData(callsign, true)
    }
}

const searchInStations = (stations, searchValue) => {
  if (stations && searchValue.length > 1) {   
      const res = stations.filter((station) => {
          const callsign = station.callsign.toLowerCase() 
          if(callsign.includes(searchValue.toLowerCase())) return true;
          return false;
      });
      return res
      
  } else {   
      return [];
  }
}
const dropdownMenuStyle = {
    height: "5rem",
    overflowY: "scroll"
}

const mapDispatchToProps = {
  fetchAircraftExtendedData,
  unFocusAircraft
}

const mapStateToProps = (state) => ({
    allStations: [...state.allAircraft.pilots, ...state.allAircraft.atc]
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)


