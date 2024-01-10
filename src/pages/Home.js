import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ProductList from '../components/products/ProductList'

const Home = () => {
    return (
        <div>
            <Navbar>
                <ProductList />
            </Navbar>
        </div>
    )
}

export default Home

{/* <div class="columns-4 gap-6 hover:columns-3">
                    <img class="w-full aspect-video rounded-xl"  src="https://picsum.photos/id/237/200/300" />
                    <img class="w-full aspect-square" src="https://picsum.photos/id/237/200/300" />
                    <img class="w-full aspect-square" src="https://picsum.photos/id/237/200/300" />
                </div> */}