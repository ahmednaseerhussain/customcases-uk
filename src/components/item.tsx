'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import NextImage from 'next/image';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import MaxWidthWrapper from './MaxWidthWrapper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'relative',
  overflow: 'hidden',
  border: 'none'
}));

export default function BasicGrid() {
  return (
    <MaxWidthWrapper className='bg-white rounded-[20px] border-gray-100/25 bg-gradient-to-tr  from-blue-300/15 to-pink-300/5 backdrop-blur-lg transition-all shadow-md'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={8}>
            <Item className="h-[300px] sm:h-[410px] rounded-[20px]">
              <NextImage
                objectFit="cover"
                layout="fill"
                alt=""
                src="/grid1.jpg"
              />
            </Item>
          </Grid>
          <Grid xs={12} sm={4}>
            <Item className="h-[300px] sm:h-[410px] rounded-[20px]">
              <NextImage
                objectFit="cover"
                layout="fill"
                alt=""
                src="/grid2.gif"
              />
            </Item>
          </Grid>
          <Grid xs={12} sm={5}>
            <Item className="h-[300px] sm:h-[410px] rounded-[20px]">
              <NextImage
                objectFit="cover"
                layout="fill"
                alt=""
                src="/grid2.jpg"
              />
            </Item>
          </Grid>
          <Grid xs={12} sm={7}>
            <div className="text-center">
              <div className="inline-block">
                <h1 className="text-gray-800 font-light !leading-tight text-3xl sm:text-4xl md:text-6xl">
                  Explore <br /> Our
                </h1>
                <h1 className="text-gradient font-medium !leading-tight text-3xl sm:text-4xl md:text-6xl">
                  Customizable
                </h1>
                <h1 className="text-gray-800 font-light !leading-tight text-3xl sm:text-4xl md:text-6xl">
                  Products
                </h1>
              </div>
              <div className="flex justify-center mt-6 sm:mt-8">
              <Link
                  href='/collections'
                  className='hidden sm:flex items-center gap-1 rounded-xl bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg'>
                  <button className="flex-1  bg-white px-2.5 py-2 rounded-[11px] text-[16px] flex items-center gap-1">
                  Discover Now
                 <ArrowRight className='ml-1.5 h-5 w-5' />
                </button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </MaxWidthWrapper>
  );
}
