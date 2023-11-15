import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const BASE_URL = "http://localhost:3000/pets"
const PET_API = axios.create({
  baseURL: BASE_URL,
})

const PetDetails = () => {
  const { id } = useParams()
  console.log(id);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pet, setPet] = useState({})
  // const navigate = useNavigate()

  useEffect(() => {
    async function fetchPet() {
      try {
        setLoading(true)
        const { data } = await PET_API.get(`/petFinder/${id}`)
        setPet(data.data.animal)
      } catch (err) {
        console.error(err);
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPet()
  }, [])

  if (loading) return <p>LOADING~</p>
  if (error) return <p>Error Fetching Pet Data .... </p>

  return (
    <>
      <div className="grid grid-cols-2 gap-4 items-center">
        <div>
          <img
            className="flex items-center justify-center"
            src={pet.photos[0]?.full || 'https://png.pngtree.com/png-vector/20230726/ourmid/pngtree-vector-dog-paw-icon-paw-print-paw-with-water-and-clouds-png-image_6746192.png'}
          />
        </div>
        <div>
          <h1>Name: {pet.name}</h1>
          <h1>About: {pet.description}</h1>
          <h1>Breed: {pet.breeds.primary}</h1>
          <h1>Color: {pet.colors?.primary || '-'} </h1>
          <h1>Gender: {pet.gender}</h1>
        </div>
      </div>
    </>
  )
}

export default PetDetails