import { useState } from "react"
import { productData } from "../../constants"
import ProductCard from "../../Components/ProductCard"
import HomeBanner from "./HomeBanner"

export default function Home() {
    // state to track user click on which tab
    const [handleClick,setHandleClick] = useState(1)
    // state for display products based on the type
    const [productList,setProductList] = useState(productData)

    const userClick = (id) => {
        setHandleClick(id)
        switch (id) {
            case 1:
                setProductList(productData)
                break;
            case 2:
                setProductList(productData.filter(product => product.type === "plain"))
                break;


            case 3:
                setProductList(productData.filter(product => product.type === "roastedandsalted"))
                break;


            case 4:
                setProductList(productData.filter(product => product.type === "valueAddedProducts"))
                break;


        
            default:
                setProductList(productData);
                break;

        }

    }  
    return (
        <main>
            <div role="tablist" className="tabs tabs-lifted">
                <button role="tab" onClick={() => userClick(1)} className={`${handleClick === 1 && "tab-active text-white"} tab font-bold [--tab-bg:#ef4444] [--tab-border-color:#ef4444]`}>All</button>
                <button role="tab" onClick={() => userClick(2)} className={`${handleClick === 2 && "tab-active text-white"} tab font-bold [--tab-bg:#ef4444] [--tab-border-color:#ef4444]`}>Plain Cashews</button>
                <button role="tab" onClick={() => userClick(3)} className={`${handleClick === 3 && "tab-active text-white"} tab font-bold [--tab-bg:#ef4444] [--tab-border-color:#ef4444]`}>Roasted And Salted</button>
                <button role="tab" onClick={() => userClick(4)} className={`${handleClick === 4 && "tab-active text-white"} tab font-bold [--tab-bg:#ef4444] [--tab-border-color:#ef4444]`}>Value Added</button>
            </div>
            <h3 className="text-3xl font-bold text-center mt-6 uppercase">featured products</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {
                    productList.slice(0,7).map((product) => (
                        <ProductCard 
                        key={product.id}
                        {...product}
                        />
                    ))
                }
            </div>
            <div className="flex justify-center mt-4">
                <button className="btn border border-red-500 hover:bg-red-500 hover:text-white  text-red-500">View More..</button>
            </div>
            {/* home page contents */}
            <HomeBanner imageNumber={1}/>
        </main>
    )
}