import React, { Component } from 'react';
import 'fontsource-roboto';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export class BitcoinPricelist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prices: [],
    }
  }

  useStyles = () => makeStyles({
    root: {
      minWidth: 350
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  render() {
    const classes = this.useStyles();

    return (
      <div style={{ width: '100%' }}>
        <h1>{this.props.currency}</h1>
        <Grid
          container
          spacing={3}
        >
          {this.props.prices.slice().reverse().map((price, index) => (
            <Grid item key={index}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    1 {price[2]} equals
                </Typography>
                  <Typography variant="h5" component="h2">
                    {`${price[0]}`}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    New Zealand Dollars
                </Typography>
                  <Typography variant="body2" component="p">
                    at {price[1]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}