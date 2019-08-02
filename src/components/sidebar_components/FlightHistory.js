import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter } from "shards-react";
export default class FlightHistory extends Component {
  render() {
    const datasets = this.convertTrailToDataset(this.props.data);
    const rootData = {
      datasets: [
        {
          label: "Altitude",
          data: datasets.alt,
          fill: false,
          yAxisID: "alt",
          borderColor: "lightblue"
        },
        {
          label: "Speed",
          data: datasets.speed,
          fill: false,
          yAxisID: "spd",
          borderColor: "salmon"
        }
      ],
      labels: datasets.time
    };
    const options = {
      scales: {
        xAxes: [
          {
            display: false,
          }
        ],
        yAxes: [
          {
            id: "alt",
            display: false
          },
          {
            id: "spd",
            display: false
          }
        ]
      },
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        },
        onClick: () => {}
      },
      elements: {
        point: {
          radius: 0
        }
      },
      tooltips: {
        mode: "index",
        intersect: false
      }
    };

    return (
      <Card>
        <CardBody style={{ padding: "0px" }}>
          <div>
            <Line data={rootData} options={options} />
          </div>
        </CardBody>
      </Card>
    );
  }

  convertTrailToDataset = trail => {
    const alt = [];
    const speed = [];
    const time = [];

    trail.forEach(capture => {
      alt.push(capture.alt);
      speed.push(capture.spd);
      
      const timestamp = new Date(capture.time);
      time.push(timestamp.toUTCString());
    });

    return {
      alt: alt.reverse(),
      speed: speed.reverse(),
      time: time.reverse(),
    };
  };
}
