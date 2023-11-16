
import { Link, useNavigate, useParams } from "react-router-dom";
import axios, { all } from "axios";
import { useState, useEffect } from "react";



const ProductDetailPage = () => {
    const {id} = useParams()
    //const navigate = useNavigate()
    const [products, setProducts] = useState()
    const [quantity, setQuantity] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const {data} = await axios.get(`http://localhost:3000/productByProductId/${id}`)
            //console.log(data, '19');
            //console.log(data.product, '20');
            setProducts(data)
        }catch(error){
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    //ini selalu ada di semua page
    //mounted effect
    useEffect(() => {
        //disini kita mau ambil data
        fetchData()
    }, [])

   


    // return (
    //     JSON.stringify(allProducts.product.imgUrl)
    // )


    const addToCartHandler = async (event) => {
        event.preventDefault()
    
        try {
          const token = localStorage.getItem('access_token');
          setLoading(true)


          let productQuantity = quantity
        
         

        await axios.post(`http://localhost:3000/cart/${id}`, {productQuantity: productQuantity}, {headers: {
                  Authorization: `Bearer ${token}`}})
    
        
        
    
          
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      };





    if(loading) return <p>Loading...</p>
    if(error) return <p>Error fetching, please try again</p>

    return (
        <>
        {/* //<h1>{products?.imgUrl}</h1> */}
        {/* {console.log(products?.imgUrl)} */}
   {/* Halaman Detail */}
<section>
    {/* 1st Product */}
    <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">



            <img alt="ecommerce" 
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" 
            src={products?.imgUrl} />
            
            
            
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">


            <h2 className="text-sm title-font text-gray-500 tracking-widest">{products?.Category?.name}</h2>


            <h1 className="text-gray-900 text-3xl title-font font-medium">{products?.name}</h1>



            <div className="text-sm title-font text-red-600 tracking-widest">
                <span>{products?.stock} stock left!</span>
            </div>


            <br />


            <p className="leading-relaxed">{products?.description}</p>
            
            
            <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">{products?.price}</span> 
            </div>





    <div className="mt-3 flex items-end justify-between">
<form onSubmit={addToCartHandler}>
        {/* INPUT QUANTITY */}
        <input type="text" 
        placeholder="Insert Quantity: "
        value={quantity}
        onChange={(e)=>{setQuantity(e.target.value)}}
        />
         {/* INPUT QUANTITY */}
      
       {/* ADD TO CART BUTTON */}
        <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
         
          <button className="text-sm" onClick={(e)=>{e.preventDefault}}>Add to cart</button>
        </div>
        {/* END OF ADD TO CART BUTTON */}
</form>
    </div>
      



            </div>
        </div>
        </div>
    </section>
    {/* end of 1st Product */}
</section>
{/* end of Halaman Detail */}
  </>
    )
}

export default ProductDetailPage