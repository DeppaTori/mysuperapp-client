import React,{Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import HeaderAppBar from './header/HeaderAppBar'
import FooterComponent from './footer/FooterComponent'
import {connect} from 'react-redux'
import {addProdukToCart} from '../../actions/cart_action'
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});




class PurchasePage extends Component{
  constructor(props){
      super(props)
  }

  componentDidMount(){

  }

  
  render(){
    const { classes,orderFetching,purchaseNo} = this.props;

   

    return (
      <div className={classes.root}>
     <Grid container spacing={24}>
        <Grid item xs>
        
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          
             {orderFetching?(
          <div>Processing Your transaction.... please wait</div>
        ):(
          <div>

                  <Typography variant="subtitle1">
                        Your order number is #{purchaseNo}. We have emailed your order confirmation, and will
                        send you an update when your order has shipped. <Link component={RouterLink} to="/">Belanja lagi</Link>
                      </Typography>
          </div>
        )}

          </Paper>
        </Grid>
        <Grid item xs>
        
        </Grid>
      </Grid>
    </div>
      // <React.Fragment>
      //   <CssBaseline />
      //   <Paper className={classes.root} elevation={1}>
      //   <Typography variant="h5" component="h3">
      //     This is a sheet of paper.
      //   </Typography>
      //   <Typography component="p">
      //     Paper can be used to build surface or other elements for your application.
      //   </Typography>
      // </Paper>
      //   {orderFetching?(
      //     <div>Processing Your transaction.... please wait</div>
      //   ):(
      //     <div>

      //             <Typography variant="subtitle1">
      //                   Your order number is #{purchaseNo}. We have emailed your order confirmation, and will
      //                   send you an update when your order has shipped.
      //                 </Typography>
      //     </div>
      //   )}
      // </React.Fragment>
    );
  }  
  
}

PurchasePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return {
    orderFetching:state.checkoutReducer.fetching,
    purchaseNo:state.checkoutReducer.purchase.purchaseNo,
  }
}

const PurchasePageContainer = connect(mapStateToProps)(PurchasePage)

export default withStyles(styles)(PurchasePageContainer);