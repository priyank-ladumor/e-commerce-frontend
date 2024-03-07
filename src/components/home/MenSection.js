import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { FaRupeeSign } from "react-icons/fa";
import { alpha } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

const HomeSection = ({ product }) => {

    function ColorPreview({ product, limit = 3, sx }) {
        const Pcolors = product && product.sizesAndColor.map((clr) => clr.color)
        const rmvSameClr = [...new Set(Pcolors)];
        const renderColors = rmvSameClr && rmvSameClr.slice(0, limit);
        const remainingColor = rmvSameClr && rmvSameClr.length - limit;
        return (
            <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end" sx={sx}>
                {renderColors && renderColors.map((color, index) => (
                    <Box
                        key={color + index}
                        sx={{
                            ml: -0.75,
                            width: 16,
                            height: 16,
                            bgcolor: color,
                            borderRadius: '50%',
                            border: (theme) => `solid 2px ${theme.palette.background.paper}`,
                            boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
                        }}
                    />
                ))}

                {rmvSameClr && rmvSameClr.length > limit && (
                    <Box component="span" sx={{ typography: 'subtitle2' }}>{`+${remainingColor}`}</Box>
                )}
            </Stack>
        );
    }

    return (
        <Card className='mx-4'>

            <NavLink to={`/products/men/${product.category.name}/${product.category.parentCategory.name}/${product._id}`} >
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    {product &&
                        <Box
                            component="img"
                            alt={product?.title}
                            src={product?.thumbnail[0]}
                            sx={{
                                top: 0,
                                width: 1,
                                height: 1,
                                objectFit: 'cover',
                                position: 'absolute',
                            }}
                        />
                    }
                </Box>
                <Stack spacing={2} sx={{ p: 3 }}>
                    <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                        {product.title}
                    </Link>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <ColorPreview product={product} />
                        <Typography variant="subtitle1 flex justify-center items-center">
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text.disabled',
                                    textDecoration: 'line-through',
                                }}
                            >
                                <div className='flex items-center justify-center'>
                                    <FaRupeeSign style={{ fontSize: "16px" }} />{product?.price}
                                </div>
                            </Typography>
                            &nbsp;
                            <div className='flex  items-center justify-center'>
                                <FaRupeeSign style={{ fontSize: "16px" }} />{product?.discountPrice}
                            </div>
                        </Typography>
                    </Stack>
                </Stack>
            </NavLink>
        </Card>
    )
}

export default HomeSection