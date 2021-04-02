import React from 'react';
import {Container, Grid, Paper, Typography} from '@material-ui/core'
import SidebarAdmin from './SidebarAdmin';
const AdminDashboardhead = () => {
    return (
        <div>
             <Container  >
                 
               
               <Paper>
                   <Typography className='text-center py-5' variant='h3'>
                       Admin Dashboard
                       
                   </Typography>
               </Paper>
               </Container>
        </div>
    );
};

export default AdminDashboardhead;