import React from 'react'

function About() {
    return (
        <section className=" items-center grid p-10 xl:h-screen xl:-mt-20 ">
           
            <div className="w-full px-6 mb-10  lg:mb-0   ">
                {/* <div className="pl-4 mb-6 border-l-4 border-gray-500 ">
                </div> */}
                <h1 className="mt-2 py-4 text-3xl border-b font-semibold md:text-5xl ">
                    About Us
                </h1>
                <p className="mb-6 text-lg leading-7  mt-7">
                    At Future Flavour, we believe in more than just delivering food to your doorstep. We're on a mission to revolutionize the way you experience culinary delights, one bite at a time. Our passion for food knows no bounds, and our commitment to excellence drives us to deliver nothing but the best to our customers.
                </p>
                <p className="mb-6 text-lg leading-7  ">
                    Future Flavour is not just another online food delivery company; it's a culinary journey into the future. We envision a world where food isn't just sustenance but an experience that tantalizes the taste buds and nourishes the soul. With innovation at our core, we're redefining the boundaries of flavor and convenience, bringing the future of food delivery to your doorstep today.
                </p>
            </div>
        </section>
    )
}

export default About