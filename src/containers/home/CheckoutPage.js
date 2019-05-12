import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormAlamat from './checkout/FormAlamat';
import FormPembayaran from './checkout/FormPembayaran';
import FormKonsumen from './checkout/FormKonsumen';
import Review from './checkout/Review';
import HeaderAppBar from './header/HeaderAppBar';
import FooterComponent from './footer/FooterComponent';
import {addShippingInfo} from '../../actions/shipping_action'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {submitOrder} from '../../actions/checkout_action'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Customer Information','Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step,parentState,onEdit) {
  switch (step) {
    case 0:
      return <FormKonsumen parentState={parentState} onEdit={onEdit} stateName="informasiKonsumen" />;
    case 1:
      return <FormAlamat parentState={parentState} onEdit={onEdit} stateName="shippingInfo" />;
    case 2:
      return <FormPembayaran parentState={parentState} onEdit={onEdit} stateName="paymentMethod" />;
    case 3:
      return <Review parentState={parentState}  />;
    
    default:
      throw new Error('Unknown step');
  }
}

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    informasiKonsumen:{
      firstName:'',
      lastName:'',
      email:'',
  },
    shippingInfo:{
      firstName:'',
      lastName:'',
      address1:'',
      address2:'',
      city:'',
      province:'',
      postalCode:'',
      country:''
  },
    paymentMethod:{
      name:'',
      cardNumber:'',
      expireDate:'',
      cvv:''
    }
  };

  onEdit = (name,value,stateName)=>{
    this.setState({
      [stateName]:{
        ...this.state[stateName],
        [name]:value
      }
    })
  }

  handleNext = () => {
    const {dispatch} = this.props
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  
    dispatch(addShippingInfo(this.state.shippingInfo))

    if(this.state.activeStep===steps.length-1){
      console.log("place order")
      this.handlePlaceOrder()
    }else{
      // console.log("not yet")
      // console.log(this.state.activeStep)
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handlePlaceOrder(){
     const {dispatch,produks} = this.props
     const purchase = {
        customer:{

          firstName: this.state.informasiKonsumen.firstName,
          lastName: this.state.informasiKonsumen.lastName,
          email:this.state.informasiKonsumen.email,
          phoneNumber: "00000000000",
          address1: this.state.shippingInfo.address1,
          address2: this.state.shippingInfo.address2,
          province: 3,
          city: 1,
          country: 2
        },
        purchaseDetails:[]
        // purchaseDetails:[
        //   {
          
        //     jumlah:213,
        //     produk:{
        //       _id:"5cd16a4d53be02435c4957a5"
        //     }
        //   }  
        // ]
     };

    
     const keys = Object.keys(produks);
     keys.map(key=>{
      purchase.purchaseDetails.push({
        jumlah:produks[key].jumlah,
        produk:{
          _id:key
        }
  })
     })

     

     dispatch(submitOrder(purchase));

  }

  render() {
    const { classes,totalHarga,orderFetching,purchaseNo} = this.props;
    const { activeStep } = this.state;

    if(totalHarga <= 0){
      return <Redirect to='/' />
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <HeaderAppBar />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                [ orderFetching ? (
                  <React.Fragment>
             
                  <Typography variant="subtitle1">
                    Please wait, processing your order...
                  </Typography>
                </React.Fragment>
                ): (
                  [
                    purchaseNo?(
                      <React.Fragment>
                      <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                      </Typography>
                      <Typography variant="subtitle1">
                        Your order number is #{purchaseNo}. We have emailed your order confirmation, and will
                        send you an update when your order has shipped.
                      </Typography>
                    </React.Fragment>
                    ):(
                      <React.Fragment>
                   
                      <Typography variant="subtitle1">
                        Something error when processing your order. :(
                      </Typography>
                    </React.Fragment>
                    )
                  ]
                )]
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep,this.state,this.onEdit)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
        <FooterComponent />
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
  
};

function mapStateToProps(state){
  return {
    totalHarga:state.cartReducer.totalHarga,
    orderFetching:state.checkoutReducer.fetching,
    purchaseNo:state.checkoutReducer.purchase.purchaseNo,
    produks:state.cartReducer.produks
  }
}

const CheckoutContainer = connect(mapStateToProps)(Checkout)

export default withStyles(styles)(CheckoutContainer);