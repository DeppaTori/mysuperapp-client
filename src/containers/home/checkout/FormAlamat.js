import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class FormAlamat extends Component {

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      firstName:'',
      lastName:'',
      address1:'',
      address2:'',
      city:'',
      province:'',
      postalCode:'',
      country:''
    }
  }

  componentDidMount(){
    const {parentState} = this.props
    const {shippingInfo} = parentState
    const {informasiKonsumen} = parentState
    shippingInfo.firstName = informasiKonsumen.firstName;
    shippingInfo.lastName = informasiKonsumen.lastName;
    const newState = Object.assign(this.state,shippingInfo)
    this.setState(newState)
  }

  handleChange(event) {
    const {onEdit,stateName} = this.props
    const text = event.target.value;
    onEdit(event.target.name,text,stateName)
    this.setState({
      [event.target.name]:text
    })
  }


  

  render(){
    
  
    return (
      
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="fname"
              onChange={e=>this.handleChange(e)} value={this.state.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="lname"
              onChange={e=>this.handleChange(e)} value={this.state.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="billing address-line1"
              onChange={e=>this.handleChange(e)} value={this.state.address1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="billing address-line2"
              onChange={e=>this.handleChange(e)} value={this.state.address2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="billing address-level2"
              onChange={e=>this.handleChange(e)} value={this.state.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="province" label="State/Province/Region" fullWidth 
              onChange={e=>this.handleChange(e)} value={this.state.province}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="postalCode"
              label="Zip / Postal code"
              fullWidth
              autoComplete="billing postal-code"
              onChange={e=>this.handleChange(e)} value={this.state.postalCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="billing country"
              onChange={e=>this.handleChange(e)} value={this.state.country}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
 
}

export default FormAlamat;