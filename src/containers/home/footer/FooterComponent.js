import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
   
    footer: {
        marginTop: theme.spacing.unit * 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit * 6}px 0`,
      },
    
  });

function FooterComponent(props){
    const {classes} = props
    return (
     
       <footer className={classes.footer}>
       <Typography variant="h6" align="center" gutterBottom>
         Toko Serba Ada @2019
       </Typography>
       <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
         Build with love by Tommy Toban
       </Typography>
     </footer>
  
    )
}

export default withStyles(styles)(FooterComponent);