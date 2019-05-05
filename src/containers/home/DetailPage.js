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
import produk_action from '../../actions/produk_action'
import {addProdukToCart} from '../../actions/cart_action'

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
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];



class DetailPage extends Component{
  constructor(props){
      super(props)
  }

  componentDidMount(){
    const {dispatch,match:{params}} = this.props
    const {id}=params
    dispatch(produk_action.readOne("no_token",id))

  }

  handleBeliClick(produk){
    const {dispatch} = this.props
    dispatch(addProdukToCart(produk))
    this.props.history.push(`/keranjang`);
  }
  
  render(){
    const { classes,record} = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <HeaderAppBar />
        <main className={classes.layout}>
         
          <Grid container spacing={40}>
             {/* Main */}
          <Grid item xs={12} md={8}>
          <Card className={classes.card}>
          <CardMedia
          className={classes.cardMedia}
          image={window.location.origin + '/images/no-image.png'}
          title="Paella dish"
        />
                  <CardContent className={classes.cardContent}>
                   
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
            </Grid>

            {/* Main */}

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
                {record.nama}
              </Typography>
              <p>Rp {record.harga}</p>
              <p><Button variant="contained" color="primary" onClick={e=>this.handleBeliClick(record)}>Beli</Button></p>
              <Typography>
                {record.deskripsi}
              </Typography>
            </Grid>
            {/* End sidebar */}

            </Grid>
        </main>
        
         <FooterComponent />
         
        {/* End footer */}
      </React.Fragment>
    );
  }  
  
}

DetailPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return {
     record:state.produkReducer.record
  }
}

const DetailPageContainer = connect(mapStateToProps)(DetailPage)

export default withStyles(styles)(DetailPageContainer);