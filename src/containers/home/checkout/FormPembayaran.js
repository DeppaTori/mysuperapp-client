import React,{Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class FormPembayaran extends Component{

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name:'',
      cardNumber:'',
      expireDate:'',
      cvv:''
    }
  }

  componentDidMount(){
    const {parentState} = this.props
    const {paymentMethod} = parentState
    const newState = Object.assign(this.state,paymentMethod)
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
        Payment method
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" name="name" label="Name on card" fullWidth
          onChange={e=>this.handleChange(e)} value={this.state.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" name="cardNumber" label="Card number" fullWidth 
           onChange={e=>this.handleChange(e)} value={this.state.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" name="expireDate" label="Expiry date" fullWidth 
              onChange={e=>this.handleChange(e)} value={this.state.expireDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            name="cvv"
            onChange={e=>this.handleChange(e)} value={this.state.cvv}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
  }

}

export default FormPembayaran;