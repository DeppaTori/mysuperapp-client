import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class FormKonsumen extends Component {

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      firstName:'',
      lastName:'',
      email:''
    }
  }

  componentDidMount(){
    const {parentState} = this.props
    const {informasiKonsumen} = parentState
    const newState = Object.assign(this.state,informasiKonsumen)
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
          Customer Information
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
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="customer email"
              onChange={e=>this.handleChange(e)} value={this.state.email}
            />
          </Grid>
       
        </Grid>
      </React.Fragment>
    );
  }
 
}

export default FormKonsumen;