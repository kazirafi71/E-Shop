import { Typography } from '@material-ui/core';
import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <div>
            <Typography className='text-center py-5 mt-4 bg-dark text-light footer__text'>
                Created By Kazi Rafi
            </Typography>
        </div>
    );
};

export default Footer;