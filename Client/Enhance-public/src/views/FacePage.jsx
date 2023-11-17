import axios from "axios";
// import { RouterProvider } from 'react-router-dom'; //in App.jsx
import { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";




const FacePage = () => {
    const navigate = useNavigate()
    const [allProducts, setAllProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    
    const imgUrlHandler = (id) => {
    
        navigate(`/product/${id}`);
        
      };
 
    
    const fetchData = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('access_token');
            //clg dulu data, dan liat di console browser, bukan liat di postman
            const {data} = await axios.get('http://localhost:3000/productByCategoryId/1', {headers: {
                Authorization: `Bearer ${token}`,
              }})
            setAllProducts(data)
            
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }


  useEffect(() => {
    fetchData();
  },[]);


  if(loading) return <p>Loading...</p>
if(error) return <p>Error fetching, please try again</p>





return(
    <>
    <div>
   
  {/* ALL PRODUCTS */}
  <section className="py-10 bg-gray-100">
   
    <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div>
    <h1 className="text-center text-2xl font-bold text-gray-800">FACE</h1>
    </div>
    {allProducts.map((eachProduct) => (
  <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300" key={eachProduct.id}>
    <div className="relative flex items-end overflow-hidden rounded-xl">
      {/* PRODUCT IMAGE */}
      <button onClick={()=>imgUrlHandler(eachProduct.id)}><img src={eachProduct.imgUrl} alt="Hotel Photo" /></button>
      {/* END OF PRODUCT IMAGE */}
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
      </div>
    </div>
    <div className="mt-1 p-2">
      {/* PRODUCT NAME */}
      <h2 className="text-slate-700">{eachProduct.name}</h2>
      {/* END OF PRODUCT NAME */}
      <div className="mt-3 flex items-end justify-between">
        {/* PRODUCT PRICE */}
        <p className="text-lg font-bold text-blue-500">{eachProduct.price}</p>
        {/* END OF PRODUCT PRICE */}
       
      </div>
    </div>
  </article>
))}




</div>
  </section>
  {/* END OF ALL PRODUCTS */}

</div>
    </>
)





}

export default FacePage