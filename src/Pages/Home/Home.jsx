import toast from 'react-hot-toast'
import axios from '../../axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate();

    const [productList, setProductList] = useState()
    const [categoryData, setCategoryData] = useState([])

    const getAllCategory = async () => {
        try {
            let result = await axios.get('/category', {
                params: {
                    search: "",
                    page: 1,
                    size: 50
                }
            })

            if (result.data.success) {
                setCategoryData(result?.data?.data ? result?.data?.data : [])
            } else toast.error('Failed')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])


    const getAllProducts = async () => {
        try {
            let result = await axios.get('/product', {
                params: {
                    search: "",
                    page: 1,
                    size: 8,
                    price: -1,
                }
            })

            if (result.data.success) {
                setProductList(result?.data?.data ? result?.data?.data : [])
            } else toast.error('Failed to fetch products')
        } catch (ERR) {
            console.log(ERR)
            toast.error(ERR?.response?.data?.msg)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <div className="bg-white">

            <div className="relative grid place-items-center w-full h-screen -mt-20">
                <div className="absolute top-0 right-0 z-0 w-full h-full">
                    <img
                        className="object-cover w-full h-screen rounded shadow-lg lg:rounded-none lg:shadow-none "
                        src="/heroimage.png"
                        alt="home page pic"
                    />
                </div>
                <div className="relative mt-10 flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                    <div className="my-20  lg:max-w-lg lg:pr-5 text-white">

                        <h2 className="mb-5 text-3xl font-bold tracking-tight  md:text-7xl sm:leading-none">
                            Quality Beyond
                        </h2>
                        <p className="pr-5 mb-5 text-3xl  md:text-3xl mt-3">
                            Shop for out new releases starting today.
                        </p>
                        <div className="flex text-3xl mt-10 md:text-3xl  items-center">
                            <a
                                href="/product"
                                className="border-l pl-5 focus:shadow-outline focus:outline-none"
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {/* Product */}
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Recommended Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {productList?.map((product, index) => (
                            <Link to={`/product/${product.product_sku}`} key={index} className="group relative" role='button'>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={`${import.meta.env.VITE_APP_BASE_URI}${product.images[0]}`}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-gray-700 capitalize">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.product_name}
                                        </h3>
                                        {/* <p className="mt-1 text-gray-500 capitalize">{product.variant[0].variant_type[0].color}</p> */}
                                    </div>
                                    <p className="font-medium text-gray-900">Rs. {product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="mx-auto max-w-7xl w-full flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0">
                <div className="flex flex-col lg:flex-row justify-between w-full items-center space-y-6 lg:space-y-0">
                    <div className=" sm:w-auto flex flex-col justify-start items-start w-full">
                        <div>
                            <p className="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800">Buy Exclusive Jewellery</p>
                        </div>
                        <div className="mt-4 w-full">
                            <p className="text-base leading-6 text-gray-600">We offer brand new and exclusive Jewellery at the best price</p>
                        </div>
                        <div className="mt-16 w-full">
                            <button onClick={() => {
                                navigate('/product')
                            }} className="px-4 bg-gray-900 flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-gray-700">
                                <p className="text-xl font-medium leading-5">See More</p>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.66663 16H25.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 21.3333L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20 10.6667L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
                        <div>
                            <img className="hidden lg:block object-cover w-full " src="/category1.png" alt="prodimg" />
                            <img className="w-80 sm:w-auto lg:hidden" src="/category1.png" alt="prodimg" />
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-0 sm:space-y-5 lg:space-y-5 xl:space-y-8">
                            <div>
                                <img className="hidden lg:block" src="category2.png" alt="prodimg" />
                                <img className="w-80 sm:w-auto lg:hidden" src="category2.png" alt="prodimg" />
                            </div>
                            <div>
                                <img className="hidden lg:block" src="category3.png" alt="prodimg" />
                                <img className="w-80 sm:w-auto lg:hidden" src="category3.png" alt="prodimg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Popular Categories</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {categoryData?.map((value, index) => (
                            <div
                                onClick={() => {
                                    navigate('/product', { state: { category: value._id } });
                                }}
                                key={index} className="group relative" role='button'>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={`${import.meta.env.VITE_APP_BASE_URI}${value.image}`}
                                        alt={value.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-gray-700 capitalize">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {value.name}
                                        </h3>
                                        {/* <p className="mt-1 text-gray-500 capitalize">{value.variant[0].variant_type[0].color}</p> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
