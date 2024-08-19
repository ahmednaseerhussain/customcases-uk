'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import NextImage from 'next/image'
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative', // Added to make sure image stays within the Item component
  overflow: 'hidden', // Added to hide any overflow
  border: 'none'
}));

export default function BasicGrid() {
  return (
    
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2}>
        <Grid xs={8} >
          <Item className='h-[410px]'>
          <NextImage
          objectFit='cover'
          layout='fill'
          alt=''
          src='/grid1.jpg'/>
          </Item>
          
        </Grid>
        <Grid xs={4}>
          <Item className='h-[410px]'> <NextImage
          objectFit='cover'
          layout='fill'
          alt=''
          src='/grid2.gif'/>
          </Item>
          
        </Grid>
        <Grid xs={5}>
          <Item className='h-[410px]'> <NextImage
          objectFit='cover'
          layout='fill'
          alt=''
          src='/grid2.jpg'/></Item>
        </Grid>
        <Grid xs={7}>
          {/* <Item className='border-hidden'> */}
          <div className='text-center'>
            <div className='inline-block'>
              <h1 className='text-center font-light !leading-tight text-gray-800 text-4xl md:text-6xl lg:text-6xl'>
                Explore <br />Our
              </h1>
              <h1 className='text-center text-gradient font-medium !leading-tight text-4xl md:text-6xl lg:text-6xl'>
                Customizable
              </h1>
              <h1 className='text-center font-light !leading-tight text-4xl md:text-6xl lg:text-6xl'>
                Products
              </h1>
            </div>
            <div className="flex justify-center mt-8">
              <Link
                href='/products'
                className={buttonVariants({
                  size: 'lg',
                  variant: 'gradient',
                  className: 'text-white flex items-center',
                })}
              >
                Discover Now <ArrowRight className='h-4 w-4 ml-1.5' />
              </Link>
            </div>
          </div>
          {/* </Item> */}
        </Grid>
      </Grid>
    </Box>
    
  );
}