import React, { Component } from 'react'
import { connect } from 'react-redux'
import Details from "./sidebar_components/FlightDetails";
import History from "./sidebar_components/FlightHistory";
import '../assets/css/Sidebar.css'

class Sidebar extends Component {
    render() {
        const { theme } = this.props;

        if(this.props.focused && this.props.focusedData != null) {
            return(
                <div className={"sidebar"} style={{backgroundColor: theme.secondary}}>
                    <Details theme={theme} data={this.props.focusedData} />
                    <History theme={theme} data={this.props.focusedData.trail} />
                </div>
                
            )
        } else {
            return(
                null
            )
        }
    }

    shouldComponentUpdate(){
        const { pending } = this.props;
        if (pending) {
            return false;
        }
        return true;
    }
}

const mapStateToProps = (state) => ({
    pending: state.pending,
    focused: state.focused,
    focusedData: state.focusedData
})

const mapDispatchToProps = null;

export default connect(
    mapStateToProps, mapDispatchToProps
)(Sidebar)