import React, { Component } from 'react'
import { Button, Card, Form, FormGroup } from "shards-react";
import { FaCog } from "react-icons/fa";
import { connect } from 'react-redux'
import Switch from "react-switch";
import "../assets/css/Settings.css"
import { toggleFIRs, toggleColorMode } from "../redux/settingsActions";

class SettingsButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             containerOpen: false,
        }
    }

    render() {
        const containerClasses = ["settingsContainer"];
        const buttonClasses = ["settingsButton"];
        const cardClasses = ["settingsCard"];

        if (this.state.containerOpen) {
          containerClasses.push("settingsContainerOpen");
          buttonClasses.push("settingsButtonOpen");
          cardClasses.push('settingsCardOpen')
        }

        const { theme } = this.props

        return (
          <div className={containerClasses.join(" ")}>
            <Button style={{backgroundColor: theme.accent, borderColor: theme.accent}} className={buttonClasses.join(" ")} onClick={() => this.setState({ containerOpen: !this.state.containerOpen })}>
              <FaCog fontSize={22} />
              <div>
                <p>Settings</p>
              </div>
            </Button>
            <Card style={{backgroundColor: theme.primary, color: theme.textPrimary}} className={cardClasses.join(' ')}>
                <Form>
                    <FormGroup style={{display: "flex", justifyContent: "space-between"}}>
                    <label htmlFor="toggleColorMode">Night Mode</label>
                    <div id="toggleColorMode">
                        <Switch onChange={() => this.props.toggleColorMode()} checked={this.props.isDarkMode} {...switchStyle}/>
                    </div>
                    </FormGroup>
                    <FormGroup style={{display: "flex", justifyContent: "space-between"}}>
                    <label htmlFor="enableFIRs">Show FIRs</label>
                    <div id="enableFIRs">
                        <Switch onChange={(sw) => this.props.toggleFIRs(sw)} checked={this.props.showFIRs} {...switchStyle}/>
                    </div>
                    </FormGroup>
                </Form>
            </Card>
          </div>
        );
    }

    handleSwitch1 = (checked) => {
        this.setState({ settings: { ...this.state.settings, switch1: checked }});
    }
}

const switchStyle = {
    onColor: "#86d3ff",
    onHandleColor: "#2693e6",
    handleDiameter: 20,
    uncheckedIcon: false,
    checkedIcon: false,
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
    activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
    height: 20,
    width: 48,
}

const mapStateToProps = (state) => ({
  showFIRs: state.settings.toggleFIRs,
  isDarkMode: state.settings.isDarkMode
})

const mapDispatchToProps = {
  toggleFIRs,
  toggleColorMode
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsButton)

