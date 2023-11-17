import axios from "axios";
import { RouterProvider } from 'react-router-dom'; //in App.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link, redirect, Outlet, useParams } from "react-router-dom";



const CartsPage = () => {

    let navigate = useNavigate()
    const [allProducts, setAllProducts] = useState([])
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    
    const fetchData = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('access_token');
            //clg dulu data, dan liat di console browser, bukan liat di postman
            const {data} = await axios.get('http://localhost:3000/cart', {headers: {
                Authorization: `Bearer ${token}`,
              }})
            
    
              setAllProducts(data.Products)

         
    
       
    
            
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const fetchAddress = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('access_token');
            //clg dulu data, dan liat di console browser, bukan liat di postman
        

              const response = await axios.get(`http://localhost:3000/user`, {headers: {
                Authorization: `Bearer ${token}`,
            }})
            console.log(response.data.address)
            if(response.data.address){
                setAddress(response.data.address)
            }
          
    
       
    
            
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }


  useEffect(() => {
    fetchData();
    fetchAddress()
  },[]);



  let totalAllProduct = allProducts.map((eachProduct)=> {
    let quantity = eachProduct?.ProductCart?.productQuantity
    let price = eachProduct?.price
    let total = quantity * price
    return total
  })
  let realSubTotal = 0
  totalAllProduct.forEach((eachNumber)=>{
    realSubTotal = realSubTotal + eachNumber})
  let realTotal = realSubTotal + 5000



const deleteButtonHandler = async (e, productId) => {
    try {
        e.preventDefault()
        setLoading(true)
        const token = localStorage.getItem('access_token');
        //clg dulu data, dan liat di console browser, bukan liat di postman
        await axios.delete(`http://localhost:3000/cart/${productId}`, {headers: {
            Authorization: `Bearer ${token}`,
          }})
          fetchData();
    
    } catch (error) {
        setError(error.message)
    } finally {
        setLoading(false)
    }
}


const formSubmitHandler = async (e, productId) => {
    try {
        e.preventDefault()
        setLoading(true)
        const token = localStorage.getItem('access_token');
        let data = {isPaid: false, address: address}
        //clg dulu data, dan liat di console browser, bukan liat di postman
        await axios.post(`http://localhost:3000/transaction`, data, {headers: {
            Authorization: `Bearer ${token}`,
          }})

        let response = await axios.post('http://localhost:3000/generate-midtrans-token', {realTotal: realTotal}, {headers: {
          Authorization: `Bearer ${token}`,
        }})
        window.location.href =response.data.redirect_url

        
        await axios.delete(`http://localhost:3000/cart`, {headers: {
          Authorization: `Bearer ${token}`,
        }})
    
    } catch (error) {
        setError(error.message)
    } finally {
        setLoading(false)
    }
}







  if(loading) return <p>Loading...</p>
  if(error) return <p>Try adding a product to the cart!</p>



	return (
		<>

<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  {/* LEFT SIDE */}
  <div className="px-4 pt-8">
    {/* PAGE TITLE */}
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">
      Check your items. And select a suitable shipping method.
    </p>
    {/* PAGE TITLE */}







    {/* ALL PRODUCT IN CART */}
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
    
      {/* 1ST PRODUCT   */}
      <div>
   
      {allProducts.map((eachProduct) => (
      <div className="flex flex-col rounded-lg bg-white sm:flex-row">
   
       
        <img
          className="m-2 h-24 w-28 rounded-md border object-cover object-center"
          src={eachProduct?.imgUrl}
          alt=""
        />

        <div className="flex w-full flex-col px-4 py-4">
          <span className="font-semibold">
            {eachProduct?.name}
          </span>
          <span className="float-right text-gray-400">{eachProduct?.ProductCart?.productQuantity}</span>
          <p className="text-lg font-bold">{eachProduct?.price}</p>
        </div>

        <button onClick={(e) => {deleteButtonHandler(e, eachProduct?.id)}} class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
        </button>
   
        



      </div>
      ))}

       </div>
      
      {/* 1ST PRODUCT */}
    </div>
    {/* ALL PRODUCT IN CART */}











    {/* SHIPPING METHOD SECTION */}
    <p className="mt-8 text-lg font-medium">Shipping Methods</p>



    <form className="mt-5 grid gap-6">
      <div className="relative">
        <input
          className="peer hidden"
          id="radio_1"
          type="radio"
          name="radio"
          defaultChecked=""
        />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
        <label
          className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
          htmlFor="radio_1"
        >
          <img
            className="w-14 object-contain"
            src="/images/naorrAeygcJzX0SyNI4Y0.png"
            alt=""
          />
          <div className="ml-5">
            <span className="mt-2 font-semibold">JNE Delivery</span>
            <p className="text-slate-500 text-sm leading-6">
              Delivery: 2-4 Days
            </p>
          </div>
        </label>
      </div>
      <div className="relative">
        <input
          className="peer hidden"
          id="radio_2"
          type="radio"
          name="radio"
          defaultChecked=""
        />
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
        <label
          className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
          htmlFor="radio_2"
        >
          <img
            className="w-14 object-contain"
            src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
            alt=""
          />
          <div className="ml-5">
            <span className="mt-2 font-semibold">TIKI Delivery</span>
            <p className="text-slate-500 text-sm leading-6">
              Delivery: 5-7 Days
            </p>
          </div>
        </label>
      </div>
    </form>
    {/* SHIPPING METHOD SECTION */}

  </div>
  {/* LEFT SIDE */}















  {/* RIGHT SIDE */}
  {/* DELIVERY DETAILS */}
  <form onSubmit={formSubmitHandler}>
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p className="text-xl font-medium">Delivery Details</p>
    <p className="text-gray-400">
      Complete your order by providing your Delivery details.
    </p>
    <div className="">
      <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
        Email
      </label>
      <div className="relative">
        <input
          type="text"
          id="email"
          name="email"
          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="your.email@gmail.com"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </div>
      </div>
      <label
        htmlFor="card-holder"
        className="mt-4 mb-2 block text-sm font-medium"
      >
        Name
      </label>
      <div className="relative">
        <input
          type="text"
          id="card-holder"
          name="card-holder"
          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Your full name here"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
            />
          </svg>
        </div>
      </div>
      <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">
        Phone Number
      </label>
      <div className="flex">
        <div className="relative w-7/12 flex-shrink-0">
          <input
            type="text"
            id="card-no"
            name="card-no"
            className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder={81234567875}
          />
        </div>
      </div>
      <label
        htmlFor="billing-address"
        className="mt-4 mb-2 block text-sm font-medium"
      >
        Billing Address
      </label>
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-shrink-0 sm:w-7/12">
          <textarea
            name="address"
            className="w-full rounded-md border border-gray-200 px-4 py-3  text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Street Address"
            value={address}
            onChange={(e)=>{setAddress(e.target.value)}}
          />
        </div>
      </div>
      {/* DELIVERY DETAILS */}
      {/* Total */}
      {/* subtotal */}
      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">{realSubTotal}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Shipping</p>
          <p className="font-semibold text-gray-900">5000</p>
        </div>
      </div>
      {/* subtotal */}
      {/* realtotal */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">{realTotal}</p>
      </div>
      {/* realtotal */}
      {/* Total */}
    </div>
    <button  className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
     Place Order
    </button>
  </div>
  </form>
  {/* RIGHT SIDE */}
</div>


		</>
	
	)

}

export default CartsPage