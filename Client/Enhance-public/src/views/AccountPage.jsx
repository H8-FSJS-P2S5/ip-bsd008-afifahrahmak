
import { useState, useEffect } from 'react';
// ? Import dan useNavigate dari react-router-dom
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios"



const AccountPage =  () => {
let navigate = useNavigate()

    const [eachProduct, setEachProduct] = useState({
        email: "",
        address: "",
        fullName: "",
        mobileNumber: "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getData = async () => {
        try {
          const token = localStorage.getItem('access_token');
            setLoading(true)
            //clg dulu data, dan liat di console browser, bukan liat di postman
            const {data} = await axios.get(`http://localhost:3000/user`, {headers: {
                Authorization: `Bearer ${token}`,
            }})
            setEachProduct({email: data.email, address: data.address, fullName:data.fullName, mobileNumber: data.mobileNumber, password: data.password})
        } catch (error) {
          console.log(error);
            setError(error.message)
        } finally {
            setLoading(false)
        }
      }
    
    
    useEffect(() => {
      getData()
    },[])



    
  const formOnSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const token = localStorage.getItem('access_token');
      setLoading(true)
     
   
        await axios.put(`http://localhost:3000/user`, eachProduct, {headers: {
              Authorization: `Bearer ${token}`,
            }})
   
            navigate(`/home`)

      
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
        <div className="bg-gray-200 min-h-screen pt-2 font-mono my-16">
  <div className="container mx-auto">
    <div className="inputs w-full max-w-2xl p-6 mx-auto">
      <h2 className="text-2xl text-gray-900">Account Setting</h2>
      
      
      
      <form className="mt-6 border-t border-gray-400 pt-4" onSubmit={formOnSubmitHandler}> 
        <div className="flex flex-wrap -mx-3 mb-6">
          
          
          
          {/* email */}
          <div className="w-full md:w-full px-3 mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-text-1"
            >
              email address
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
              id="grid-text-1"
              name="email"
              type="text"
              required=""
              value={eachProduct.email}  
              onChange={(e) => {setEachProduct({...eachProduct, email: e.target.value})}}
            />
          </div>
            {/* end of email */}







    
            {/* full name */}
            <div className="flex items-center justify-between mt-4">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Full name
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                  id="grid-text-1"
                  type="text"
                  required=""
                  name="fullName"
              value={eachProduct.fullName}  
              onChange={(e) => {setEachProduct({...eachProduct, fullName: e.target.value})}}
                />
              </div>
            </div>
            {/* full name */}







            {/* Phone number */}
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phone number
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                type="text"
                required=""
                name="mobileNumber"
              value={eachProduct.mobileNumber}  
              onChange={(e) => {setEachProduct({...eachProduct, mobileNumber: e.target.value})}}
              />
            </div>
            {/* phone number */}



            {/* address */}
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
              </label>
              <textarea
                className="bg-gray-100 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                required=""
                name="address"
                value={eachProduct.address}  
                onChange={(e) => {setEachProduct({...eachProduct, address: e.target.value})}}
              />
            </div>
            {/* address */}









            <div className="flex justify-end">
              <button
                className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                type="submit"
              >
                save changes
              </button>
            </div>









        
        </div>
      </form>
    </div>
  </div>
</div>
</>
    )
}


export default AccountPage