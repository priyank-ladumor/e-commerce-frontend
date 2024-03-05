// /* eslint-disable no-unused-expressions */
// import React, { useEffect } from 'react'
// import { Fragment, useState } from 'react'
// import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
// import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
// import { NavLink, useLocation, useParams, useSearchParams } from 'react-router-dom';
// import { MdStarRate } from "react-icons/md"
// import { useDispatch, useSelector } from 'react-redux'
// import { getProducts } from '../../store/action/productsAction'
// import { getthirdlevelCategoryAction, getthirdlevelCategoryFilterAction } from '../../store/action/categoryAction'
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Button from '@mui/material/Button';
// import {
//     MenuItem,
//     Select,
// } from "@mui/material";
// import FormControl from '@mui/material/FormControl';
// import { CompactPicker } from 'react-color'
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Slider from '@mui/material/Slider';
// import TextField from '@mui/material/TextField';
// import FormLabel from '@mui/material/FormLabel';
// import { IoFilter } from "react-icons/io5";
// import { getSizesAction } from '../../store/action/sizeAction'
// import RadioGroup from '@mui/material/RadioGroup';
// import IconButton from '@mui/material/IconButton';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import { MdClearAll } from "react-icons/md";
// import Pagination from '@mui/material/Pagination';
// import Link from '@mui/material/Link';
// import Card from '@mui/material/Card';
// // import Label from 'src/components/label';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { FaRupeeSign } from "react-icons/fa";
// import { alpha } from '@mui/material/styles';
// import { Bars } from 'react-loader-spinner'

// const HomeSection = ({ newproduct }) => {
//     const { topCategory } = useParams()
//     const location = useLocation()
//     function ColorPreview({ product, limit = 3, sx }) {
//         const Pcolors = product && product.sizesAndColor.map((clr) => clr.color)
//         const rmvSameClr = [...new Set(Pcolors)];
//         const renderColors = rmvSameClr && rmvSameClr.slice(0, limit);
//         const remainingColor = rmvSameClr && rmvSameClr.length - limit;
//         return (
//             <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end" sx={sx}>
//                 {renderColors && renderColors.map((color, index) => (
//                     <Box
//                         key={color + index}
//                         sx={{
//                             ml: -0.75,
//                             width: 16,
//                             height: 16,
//                             bgcolor: color,
//                             borderRadius: '50%',
//                             border: (theme) => `solid 2px ${theme.palette.background.paper}`,
//                             boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
//                         }}
//                     />
//                 ))}

//                 {rmvSameClr && rmvSameClr.length > limit && (
//                     <Box component="span" sx={{ typography: 'subtitle2' }}>{`+${remainingColor}`}</Box>
//                 )}
//             </Stack>
//         );
//     }
// console.log(newproduct,"newproduct");
//     return (<>
//         <div className="lg:col-span-3">
//             <div className="bg-[#fff] ">
//                 <div className="mx-auto max-w-2xl px-4 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-8">
//                     <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
//                         {newproduct && Array.from(newproduct)?.map((product) =>
//                         (
//                             <>
//                                 <NavLink to={`/products/${topCategory}/${location.search && location.search.split("?category=")[1].split("&")[0]}/${location.search?.split("&thirdCategory[0]=" || "&thirdCategory=")[1] ? location.search?.split("&thirdCategory[0]=" || "&thirdCategory=")[1] : newproduct[0]?.category?.name}/${product._id}`}>
//                                     <Card>
//                                         <Box sx={{ pt: '100%', position: 'relative' }}>
//                                             {/* {product && product.createdAt.split("T")[0] === new Date().toISOString().split("T")[0] &&
//                                 <Label
//                                     variant="filled"
//                                     color='info'
//                                     sx={{
//                                         zIndex: 9,
//                                         top: 16,
//                                         right: 16,
//                                         position: 'absolute',
//                                         textTransform: 'uppercase',
//                                     }}
//                                 >
//                                     new
//                                 </Label>} */}
//                                             {product &&
//                                                 <Box
//                                                     component="img"
//                                                     alt={product?.title}
//                                                     src={product?.thumbnail[0]}
//                                                     sx={{
//                                                         top: 0,
//                                                         width: 1,
//                                                         height: 1,
//                                                         objectFit: 'cover',
//                                                         position: 'absolute',
//                                                     }}
//                                                 />}
//                                         </Box>
//                                         <Stack spacing={2} sx={{ p: 3 }}>
//                                             <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
//                                                 {product.title}
//                                             </Link>

//                                             <Stack direction="row" alignItems="center" justifyContent="space-between">
//                                                 <ColorPreview product={product} />
//                                                 <Typography variant="subtitle1 flex justify-center items-center">
//                                                     <Typography
//                                                         component="span"
//                                                         variant="body1"
//                                                         sx={{
//                                                             color: 'text.disabled',
//                                                             textDecoration: 'line-through',
//                                                         }}
//                                                     >
//                                                         <div className='flex items-center justify-center'>
//                                                             <FaRupeeSign style={{ fontSize: "16px" }} />{product?.price}
//                                                         </div>
//                                                     </Typography>
//                                                     &nbsp;
//                                                     <div className='flex  items-center justify-center'>
//                                                         <FaRupeeSign style={{ fontSize: "16px" }} />{product?.discountPrice}
//                                                     </div>
//                                                 </Typography>
//                                             </Stack>
//                                         </Stack>
//                                     </Card>
//                                 </NavLink>
//                             </>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>);
// }
// export default HomeSection


import React from 'react'

const HomeSection = ({ product }) => {

    return (
        <div className="flex flex-col items-center cursor-pointer bg-white rounded-lg overflow-hidden w-[15rem] mx-3 border-2 p-2 border-gray-200 mt-5">

            <div className='h-[13rem] w-[10rem]'>
                <img src={product.imageUrl} className="w-full h-full object-cover object-top" alt='' />
            </div>
            <div className="p-4">
                <h3 className="text-lg text-gray-900 font-medium">{product.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{product.brand}</p>
            </div>
        </div>
    )
}

export default HomeSection