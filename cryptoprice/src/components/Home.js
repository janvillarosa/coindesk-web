import React, { Component } from 'react';
import { BitcoinPricelist } from './BitcoinPricelist';
import { PriceChart } from './PriceChart';
import * as SignalR from '@aspnet/signalr';
import moment from 'moment';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.priceChart = React.createRef();
    this.state = {
      ethPrices: [],
      btcPrices: []
    }
  }

  componentDidMount = async () => {
    const prices = await this.LoadInitialValues();
    prices.forEach(recievedPrice => {
      if (recievedPrice.currency === "Bitcoin") {
        this.setState({ prices: this.PushPriceData(recievedPrice, this.state.btcPrices) });
      } else {
        this.setState({ prices: this.PushPriceData(recievedPrice, this.state.ethPrices) });
      }
    });
    this.InitialiseHub();
  }

  LoadInitialValues = async () => {
    const response = await fetch("https:///localhost:5001/Coinbase", {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    });

    return await response.json();
  }

  InitialiseHub = () => {
    const hubConnection = new SignalR.HubConnectionBuilder().withUrl("https:///localhost:5001/coinhub").build();

    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));

      this.state.hubConnection.on('ReceivePrice', (recievedPrice) => {
        if (recievedPrice.currency === "Bitcoin") {
          this.setState({ prices: this.PushPriceData(recievedPrice, this.state.btcPrices) });
        } else {
          this.setState({ prices: this.PushPriceData(recievedPrice, this.state.ethPrices) });
        }
      })
    })
  }

  PushPriceData = (recievedPrice, prices) => {
    const price = `${parseFloat(recievedPrice.value).toFixed(2)}`;
    const date = moment(recievedPrice.date).format('LTS');
    const coin = recievedPrice.currency;
    if (prices.length === 6) {
      prices.shift();
    }
    prices.push([price, date, coin]);
    this.priceChart.current.RefreshChart();
    return prices;
  }

  render() {
    return (
      <div>
        <div style={{ display: 'block' }}>
          <BitcoinPricelist prices={this.state.btcPrices} currency={"Bitcoin (BTC)"} />
          <BitcoinPricelist prices={this.state.ethPrices} currency={"Ethereum (ETH)"} />
        </div>
        <div style={{ display: 'flex', marginTop: "50px" }}>
          <PriceChart ethPrices={this.state.ethPrices} btcPrices={this.state.btcPrices} ref={this.priceChart} />
        </div>
      </div>
    );
  }
}