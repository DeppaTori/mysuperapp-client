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
import produk_action from '../../actions/produk_action'
import {connect} from 'react-redux'

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
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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


const cards = [
  {
    nama:'Komputer',
    harga:5700,
    deskripsi:'This is a media card. You can use this section to describe the content.'
  },
  {
    nama:'Laptop',
    harga:2500,
    deskripsi:'This is a media card. You can use this section to describe the content.'
  },
  {
    nama:'Pulpen',
    harga:340,
    deskripsi:'This is a media card. You can use this section to describe the content.'
  },
  {
    nama:'Meja Komputer',
    harga:6900,
    deskripsi:'This is a media card. You can use this section to describe the content.'
  },
  {
    nama:'Lampu Meja',
    harga:400,
    deskripsi:'This is a media card. You can use this section to describe the content.'
  },
  {
    nama:'Lemari',
    harga:9000,
    deskripsi:'This is a media card. You can use this section to describe the content.'
  },
  {
    nama:'Meja Makan',
    harga:5900,
    deskripsi:'This is a media card. You can use this section to describe the content.'
  }
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

//function HomePage(props) {
class HomePage extends Component{
  constructor(props){
      super(props)
      this.beliProduk = this.beliProduk.bind(this)
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(produk_action.fetch('no_token'));
 }

  beliProduk(id){
    this.props.history.push(`/produk/${id}`);
  }

  

  render(){
    const { classes,records} = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <HeaderAppBar />
        <main className={classes.layout}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Toko Serba Ada
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" component="p">
              Selamat datang di Toko Serba Ada. Segala kebutuhan Anda, ada di sini. Happy Shopping!
            </Typography>
          </div>
          {/* End hero unit */}
          <Grid container spacing={40}>
              {records.map( (record,k) => (
                <Grid item key={k} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={window.location.origin + '/images/no-image.png'}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {record.nama}
                      </Typography>
                      <Typography>
                      Rp. {record.harga}
                      </Typography>
                      <Typography>
                      {record.deskripsi}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary" onClick={e=>this.beliProduk(record._id)}>
                        Beli
                      </Button>
                     
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
        </main>
        
         <FooterComponent />
         
        {/* End footer */}
      </React.Fragment>
    );
  }  
  
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return {
    records: state.produkReducer.records
  }
}

const HomePageModule = connect(mapStateToProps)(HomePage)

export default withStyles(styles)(HomePageModule);