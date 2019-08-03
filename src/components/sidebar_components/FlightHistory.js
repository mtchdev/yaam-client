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

    // Note that there are a LOT of hacks here to get the chart to fit how I want it to in the div.
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
            display: true,
            gridLines: {
                display: false,
                drawBorder: false,
                drawTicks: false
            },
            ticks: {
                callback: (value, index, values) => {
                    return ''
                },
                mirror: true
            }
          },
          {
            id: "spd",
            display: false
          }
        ]
      },
      legend: {
        display: true,
        position: 'bottom',
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
        <CardHeader><h5 style={{margin: 0}}>Flight History</h5></CardHeader>
        <CardBody style={{padding: 0, paddingBottom: '15px', paddingTop: '15px'}}>
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
