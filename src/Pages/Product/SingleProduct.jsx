import { Field, Form, Formik } from 'formik'
import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaHeart, FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Rating from 'react-rating'

function SingleProduct() {

    const { id } = useParams()
    console.log(id)

    const [productData, setProductData] = useState()
    // const [selectedVariantData, setSelectedVariantData] = useState()
    const [ratingData, setRatingData] = useState()

    const getProductDetail = async () => {
        try {
            let result = await axios.get('/products/' + id)

            if (result.data.success) {
                setProductData(result?.data?.data ? result?.data?.data : [])
                getReviews(result?.data?.data?._id)
                // setSelectedVariantData(result?.data?.data?.variant[0] ? result?.data?.data?.variant[0] : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }
    const addToCart = async () => {
        try {
            let result = await axios.post('/carts/add/', {
                item: productData?._id,
                quantity: 1
            })

            if (result.data.success) {
                toast.success('Added To Cart')
                // setProductData(result?.data?.data ? result?.data?.data : [])
                // setSelectedVariantData(result?.data?.data?.variant[0] ? result?.data?.data?.variant[0] : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }
    const addToWishlist = async () => {
        try {
            let result = await axios.post('/wishlist/' + productData?._id)

            if (result.data.success) {
                toast.success('Added To Wishlist')
                // setSelectedVariantData(result?.data?.data?.variant[0] ? result?.data?.data?.variant[0] : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    const getReviews = async (id) => {
        try {
            let result = await axios.get('/review/' + id, {
                params: {
                    page: 1,
                    size: 999
                }
            })

            if (result.data.success) {
                console.log(result.data.data)
                setRatingData(result.data.data)
                // setProductData(result?.data?.data ? result?.data?.data : [])
                // setSelectedVariantData(result?.data?.data?.variant[0] ? result?.data?.data?.variant[0] : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    const addReview = async (values, actions) => {
        try {
            let result = await axios.post('/review', values)

            if (result.data.success) {
                toast.success('Review Added Successfully')
                getProductDetail()
                actions.resetForm()
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            if (ERR?.response?.status === 401) {
                toast.error('Please Login To Review.')
            } else toast.error(ERR?.response?.data?.message)
        }
    }

    useEffect(() => {
        getProductDetail()
    }, [id])


    // console.log('selectedVariantData', selectedVariantData)
    return (
        <div>
            <div className="bg-white">
                <div className="pt-6">
                    {/* <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li>
                                <div className="flex items-center">
                                    <a href="#" className="mr-2 text-sm font-medium text-gray-900">Men</a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <a href="#" className="mr-2 text-sm font-medium text-gray-900">Clothing</a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>

                            <li className="text-sm">
                                <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">Basic Tee 6-Pack</a>
                            </li>
                        </ol>
                    </nav> */}

                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
                        {/* <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" alt="Two each of gray, white, and black shirts laying flat." className="h-full w-full object-cover object-center" />
                        </div> */}
                        {/* {
                            productData?.images?.map((value, index) => (
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg" key={index}>
                                    <img src={`${import.meta.env.VITE_APP_BASE_URI}${value}`} alt="Prod Img" className="h-full w-full object-cover object-center" />
                                </div>
                            ))
                        } */}

                        {/* <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg" alt="Model wearing plain white basic tee." className="h-full w-full object-cover object-center" />
                        </div> */}
                    </div>

                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <div className='grid grid-cols-2 gap-2'>
                                {
                                    productData?.images?.map((value, index) => (
                                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg border" key={index}>
                                            <img src={`${import.meta.env.VITE_APP_BASE_URI}${value}`} alt="Prod Img" className="h-full w-full object-cover object-center" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="mt-4 lg:row-span-3 lg:mt-0">

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl capitalize">{productData?.product_name}</h1>

                            </div>
                            <p className="text-3xl tracking-tight text-gray-900">Rs. {productData?.price}</p>

                            <div className='flex items-center gap-3 my-3'>
                                <Rating step={1} name="rating" readonly initialRating={productData?.rating} fullSymbol={<FaStar color='#ffe234' size={20} strokeWidth={2} stroke='black' />} emptySymbol={<FaStar color='white' size={20} strokeWidth={2} stroke='black' />} />
                                <label className='mb-1'>
                                    {productData?.rating} / 5
                                </label>
                            </div>

                            {/* <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                        <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                        <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                        <svg className="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                        <svg className="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="sr-only">4 out of 5 stars</p>
                                    <a href="#" className="ml-3 text-sm font-medium text-gray-600 hover:text-gray-500">117 reviews</a>
                                </div>
                            </div> */}

                            {/* <form className="mt-10">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                    <fieldset className="mt-4">
                                        <legend className="sr-only">Choose a color</legend>
                                        <div className="flex items-center space-x-3">

                                            <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                                <input type="radio" name="color-choice" value="White" className="sr-only" aria-labelledby="color-choice-0-label" />
                                                <span id="color-choice-0-label" className="sr-only">White</span>
                                                <span aria-hidden="true" className="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"></span>
                                            </label>

                                            <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                                <input type="radio" name="color-choice" value="Gray" className="sr-only" aria-labelledby="color-choice-1-label" />
                                                <span id="color-choice-1-label" className="sr-only">Gray</span>
                                                <span aria-hidden="true" className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"></span>
                                            </label>

                                            <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                                                <input type="radio" name="color-choice" value="Black" className="sr-only" aria-labelledby="color-choice-2-label" />
                                                <span id="color-choice-2-label" className="sr-only">Black</span>
                                                <span aria-hidden="true" className="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"></span>
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-500">Size guide</a>
                                    </div>

                                    <fieldset className="mt-4">
                                        <legend className="sr-only">Choose a size</legend>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
                                                <input type="radio" name="size-choice" value="XXS" disabled className="sr-only" aria-labelledby="size-choice-0-label" />
                                                <span id="size-choice-0-label">XXS</span>
                                                <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                                    <svg className="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                                                        <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                                                    </svg>
                                                </span>
                                            </label>

                                            {
                                                productData?.map((value, index) => (
                                                    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                                                        <input type="radio" name="size-choice" value="XS" className="sr-only" aria-labelledby="size-choice-1-label" />
                                                        <span id="size-choice-1-label">{value?.variant_type[0].size}</span>
                                                        <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                                                    </label>
                                                ))
                                            }



                                        </div>
                                    </fieldset>
                                </div>

                            </form> */}
                            <div className='flex flex-wrap gap-3'>
                                <button type="button"
                                    onClick={() => {
                                        addToCart()
                                    }}
                                    className="mt-5 flex flex-1 items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Add to Cart</button>
                                <button type="button"
                                    onClick={() => {
                                        addToWishlist()
                                    }}
                                    className="mt-5 flex w-fit items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                    {/* Add to Wishlist */}
                                    <FaHeart />
                                </button>
                            </div>
                            <div className='mt-10'>

                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    {/* <p className="text-base text-gray-900">The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to your outfit? Our white tee has you covered.</p> */}
                                    <p className="text-base text-gray-900">{productData?.description}</p>
                                </div>
                            </div>

                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* <!-- Description and details --> */}
                            {/* <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
                                    <p className="text-base text-gray-900">{productData?.description}</p>
                                </div>
                            </div> */}

                            {/* <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        <li className="text-gray-400"><span className="text-gray-600">Hand cut and sewn locally</span></li>
                                        <li className="text-gray-400"><span className="text-gray-600">Dyed with our proprietary colors</span></li>
                                        <li className="text-gray-400"><span className="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>
                                        <li className="text-gray-400"><span className="text-gray-600">Ultra-soft 100% cotton</span></li>
                                    </ul>
                                </div>
                            </div> */}

                            {/* <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <section className='max-w-7xl mx-auto p-4'>
                        <h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
                            Comments
                        </h1>

                        <Formik
                            enableReinitialize
                            initialValues={{
                                rating: 0,
                                product: productData?._id,
                                message: ""
                            }}
                            onSubmit={(values, actions) => {
                                addReview(values, actions)
                            }}
                        >
                            {props => (
                                <Form>
                                    <div className='mt-3'>
                                        <Rating step={1} name="rating" onChange={(rating) => {
                                            props.setFieldValue('rating', rating)
                                        }} value={props.values.rating} initialRating={props.values.rating} fullSymbol={<FaStar color='#ffe234' size={20} strokeWidth={2} stroke='black' />} emptySymbol={<FaStar color='white' size={20} strokeWidth={2} stroke='black' />} />
                                    </div>
                                    <div className='my-3 flex flex-col'>
                                        <Field name="message" value={props.values.message} as="textarea" className='w-full border mt-3 rounded p-2' placeholder='Write a Comment' />
                                        <button type='submit' className='bg-blue-700 w-fit px-4 py-2 rounded text-white mt-3 place-self-end'>Submit</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        <div className='mt-10'>
                            {
                                ratingData?.map((value, index) => (
                                    <div className='w-full flex my-4 gap-4 shadow p-2 items-center'>
                                        <div>
                                            {
                                                value.user.image ?
                                                    <img src={`${import.meta.env.VITE_APP_BASE_URI}${value.user.image}`} className='h-20 w-20 object-cover' />
                                                    :
                                                    <img src='/app_logo.png' className='h-20 w-20 object-cover' />
                                            }
                                        </div>
                                        <div className='font-semibold flex flex-col gap-1'>
                                            <div className='flex items-center gap-4 text-gray-400 text-sm'>
                                                <label className='mb-1'>
                                                    {value.user.firstname} {value.user.lastname}
                                                </label>
                                                <Rating step={1} name="rating" readonly initialRating={value?.rating} fullSymbol={<FaStar color='#ffe234' size={14} strokeWidth={2} stroke='black' />} emptySymbol={<FaStar color='white' size={14} strokeWidth={2} stroke='black' />} />
                                            </div>
                                            <span>
                                                {value?.message}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default SingleProduct