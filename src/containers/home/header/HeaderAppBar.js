import React,{Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import {connect} from 'react-redux';

const styles = theme => ({
   
    button: {
      color:'white'
    },
    appBar: {
      position: 'relative',
      backgroundColor:'#9ef442',
      color:'white'
    },
    toolbarTitle: {
        flex: 1,
      },
      link: {
        margin: theme.spacing.unit,
      },
  });

class HeaderAppBar extends Component{

    constructor(props){
       super(props)
     
    }

    handleNameClick(){
      this.props.history.push(`/`);
    }

    handleCartClick(){
      this.props.history.push(`/keranjang`);
    }

    render(){

      const { classes,totalHarga} = this.props;

      return (
          <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} >
            <Link component={RouterLink} className={classes.link} to="/">
            Toko Serba Ada
            </Link>
              
            </Typography>
            <Button className={classes.button}>Account</Button>
            <Link component={RouterLink} className={classes.button} to="/keranjang">
              CART ({totalHarga})
            </Link>
          
            <Button color="primary" variant="outlined" className={classes.button}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      )
    }

    

   

}

function mapStateToProps(state){
   return {
      totalHarga:state.cartReducer.totalHarga
   }
}

const HeaderAppContainer = connect(mapStateToProps)(HeaderAppBar)



export default withStyles(styles)(HeaderAppContainer);

