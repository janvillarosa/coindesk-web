import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class PriceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btcDatapoints: [],
      ethDatapoints: []
    }
  }

  GenerateDatapoints = (prices) => {
    if (prices.length === 0) {
      return [];
    }
    var datapoints = [];
    for (let price of prices) {
      var datapoint = {};
      datapoint.label = price[1];
      datapoint.y = parseFloat(price[0]);
      datapoints.push(datapoint);
    }
    return datapoints;
  }

  RefreshChart = () => {
    this.setState({ ethDatapoints: this.GenerateDatapoints(this.props.ethPrices) });
    this.setState({ btcDatapoints: this.GenerateDatapoints(this.props.btcPrices) });
  }

  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Price of Crypto Over Time"
      },
      axisY: {
        title: "Price in NZD",
      },
      axisX: {
        title: "Time",
        interval: 2
      },
      data: [{
        type: "spline",
        name: "ETH Price",
        showInLegend: true,
        dataPoints: this.state.ethDatapoints
      },
      {
        type: "spline",
        name: "BTC Price",
        showInLegend: true,
        dataPoints: this.state.btcDatapoints
      }
      ]
    };
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <CanvasJSChart options={options}
        /* onRef={ref => this.chart = ref} */
        />
      </div>
    );
  }
}