import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'

// const products = [
//   { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//   { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//   { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//   { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];


const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];


const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Review(props) {
  const { classes,parentState,produks,totalHarga} = props;
  const payments = [
    { name: 'Card type', detail: parentState.paymentMethod.cardNumber>1000?'Visa':'Master Card' },
    { name: 'Card holder', detail: parentState.paymentMethod.name },
    { name: 'Card number', detail: parentState.paymentMethod.cardNumber },
    { name: 'Expiry date', detail: parentState.paymentMethod.expireDate },
  ];
  const products = [];
  const keys = Object.keys(produks);
  keys.map(key=>{
    products.push({ name: `${produks[key].nama} x ${produks[key].jumlah}`, desc: produks[key].deskripsi, price:`Rp ${produks[key].harga*produks[key].jumlah}` })
  })
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            Rp. {totalHarga}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{parentState.shippingInfo.firstName} {parentState.shippingInfo.lastName}</Typography>
          <Typography gutterBottom>{parentState.shippingInfo.address1} </Typography>
          <Typography gutterBottom>{parentState.shippingInfo.address2} </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return {
    produks:state.cartReducer.produks,
    totalHarga:state.cartReducer.totalHarga
  }
}

const ReviewContainer = connect(mapStateToProps)(Review)

export default withStyles(styles)(ReviewContainer);