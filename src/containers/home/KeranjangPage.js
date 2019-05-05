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

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import HeaderAppBar from './header/HeaderAppBar';
import FooterComponent from './footer/FooterComponent';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux'
import {removeProdukFromCart} from '../../actions/cart_action'


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
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
  layout: {
    width: 'auto',
    marginTop:theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardMedia:{
    width:400,
    height:400
    
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
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
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



class KeranjangPage extends Component{
  constructor(props){
      super(props)
  }

  

  handleCheckoutClick(){
    this.props.history.push(`/checkout`);
  }

  handleHapusClick(produkId){
 
    const {dispatch} = this.props
    dispatch(removeProdukFromCart(produkId))
  }

  
  
  render(){
    const { classes,produks,totalHarga} = this.props;
  
    const produksAr = Object.values(produks);
    const produksArId = Object.keys(produks);
    return (
      <React.Fragment>
        <CssBaseline />
        <HeaderAppBar />
        <main className={classes.layout}>
         
        <Paper className={classes.paper}>
            <Typography component="h5" variant="h4" align="center">
              Keranjang Belanja Anda
            </Typography>
       
            <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Nama Produk</TableCell>
            <TableCell align="right">Harga</TableCell>
            <TableCell align="right">Jumlah</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            produksAr.map( (produk,key) => (
             
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {produk.nama}
              </TableCell>
              <TableCell align="right">{produk.harga}</TableCell>
              <TableCell align="right">{produk.jumlah}</TableCell>
              <TableCell align="right">{produk.harga*produk.jumlah}</TableCell>
              <TableCell align="center"><Button onClick={e=>this.handleHapusClick(produksArId[key])}>Hapus</Button></TableCell>
            </TableRow>
          ))
          }
          <TableRow>
             
              <TableCell colSpan="3" align="right">Total</TableCell>
              <TableCell align="right">{totalHarga}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={e=>this.handleCheckoutClick()}>Checkout</Button>
            
          </Paper>

        </main>
        
         <FooterComponent />
         
        {/* End footer */}
      </React.Fragment>
    );
  }  
  
}

KeranjangPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return {
     produks:state.cartReducer.produks,
     totalHarga:state.cartReducer.totalHarga
  }
}

const KeranjangPageModule = connect(mapStateToProps)(KeranjangPage)

export default withStyles(styles)(KeranjangPageModule);