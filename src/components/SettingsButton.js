import React, { Component } from 'react'
import { Button, Card, Form, FormGroup } from "shards-react";
import { FaCog } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import Switch from "react-switch";
import "../assets/css/Settings.css"

export default class SettingsButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             containerOpen: false,
             settings: {
                 switch1: false,
             }
        }
    }

    render() {
        const containerClasses = ['settingsContainer'];
        const buttonClasses = ['settingsButton'];
        const cardClasses = ['settingsCard'];

        if (this.state.containerOpen) {
          containerClasses.push("settingsContainerOpen");
          buttonClasses.push("settingsButtonOpen");
          cardClasses.push('settingsCardOpen')
        }

        return (
          <div className={containerClasses.join(" ")}>
            <Button className={buttonClasses.join(" ")} onClick={() => this.setState({ containerOpen: !this.state.containerOpen })}>
              <FaCog fontSize={22} />
              <div>
                <p>Settings</p>
              </div>
            </Button>
            <Card className={cardClasses.join(' ')}>
                <Form>
                    <FormGroup style={{display: "flex", justifyContent: "space-between"}}>
                    <label htmlFor="switch1">Night Mode</label>
                    <div id="switch1">
                        <Switch onChange={this.handleSwitch1} checked={this.state.settings.switch1} {...switchStyle}/>
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