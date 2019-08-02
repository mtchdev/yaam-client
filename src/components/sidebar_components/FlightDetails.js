import React, { Component } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Progress,
    Badge
} from 'shards-react'

export default class FlightHistory extends Component {
    render() {
        const {callsign, airline, pilotName, aircraft, dep, arr } = this.props.data;
        return (
                <Card className={"sidebar-flightdetails"}>
                    <CardHeader><h5>{callsign}</h5></CardHeader>
                    <CardBody>
                        <div className="mainDetailsFlex">
                            <div>
                                <h4>{dep.code.icao}</h4>
                                <p>{dep.region.city}</p>
                            </div>

                            <div><h5>to</h5></div>
                            
                            <div>
                                <h4>{arr.code.icao}</h4>
                                <p>{arr.region.city}</p>
                            </div>
                        </div>
                        <Progress value="20"></Progress>
                        <hr />
                        <div className={"subdetailsFlex"}>
                        <img style={{maxWidth: '50%', height: '50%'}} src={"https://planefinder.net/flightstat/v2/getLogo3x.php?airlineCode=EZY&requestThumb=1"} alt={""}/>
                        <div>
                            <p style={{fontSize: 14}}>Aircraft type</p>
                            {/* <p style={{color: 'gray'}}>{aircraft}</p> */}
                            <Badge theme="primary">{aircraft}</Badge>
                        </div>
                        </div>

                    </CardBody>
                </Card>
        )
    }
}
