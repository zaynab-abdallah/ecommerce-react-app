import React, { useEffect } from 'react'
import HeroSilder from "../components/HeroSilder";
import SlideProduct from "../components/slideProducts/SlideProduct.jsx";
import "../page/Home.css"
import SlideProductSkeleton from "../components/slideProducts/SlideProductLoading.jsx";
import PageTransition from "../components/PageTransition";


const categories = [
    "smartphones",
    "mobile-accessories",
    "laptops",
    "tablets",
    "sports-accessories",
    "sunglasses",

]
function Home() {

    const [products, setProducts] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await Promise.all(
                    categories.map(async (category) => {
                        const res = await fetch(`https://dummyjson.com/products/category/${category}`);
                        const data = await res.json();

                        return { [category]: data.products }

                    })
                )
                const productsData = Object.assign({}, ...result);
                setProducts(productsData);



            } catch (error) {
                console.error("Error fetching products:", error);
            }finally {
                setLoading(false);
            }

        }
        fetchProducts();

    }, [])

    console.log("Products Data:", products);





    return (
        <PageTransition>
            <div>

                <HeroSilder />

{loading ? (
    categories.map((cat, index) => (
        <SlideProductSkeleton key={index} />
    ))
) : (
    categories.map((category) => (
        <SlideProduct
            key={category}
            data={products[category]}
            title={category.replace("-", " ")}
        />
    ))
)}




           

            </div>
        </PageTransition>
    )
}

export default Home
