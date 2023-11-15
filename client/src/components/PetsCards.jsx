import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = "http://localhost:3000/pets"
const PET_API = axios.create({
  baseURL: BASE_URL,
})

const PetCards = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pets, setPets] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPets() {
      try {
        setLoading(true)
        const { data } = await PET_API.get("/petFinder")
        setPets(data.data.animals)
        console.log(data.data.animals)
      } catch (err) {
        console.error(err);
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPets()
  }, [])

  const onClickHandler = (id) => {
    navigate(`/petDetails/${id}`)
  }

  if (loading) return <p>LOADING~</p>
  if (error) return <p>Error Fetching Pet Data .... </p>

  return (
    <>
      {pets.map((pet) => (
        <div key={pet.id} className="block rounded-full bg-white dark:bg-neutral-700 mx-[1rem] my-[1rem]">
          <div
            className="rounded-full relative bg-cover bg-no-repeat flex justify-center hover:bg-[rgba(0,225,245,0.33)] transition-all duration-300"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <img
              className="rounded-full h-[30rem] w-[33rem] object-cover"
              src={pet.photos[0]?.full || 'https://png.pngtree.com/png-vector/20230726/ourmid/pngtree-vector-dog-paw-icon-paw-print-paw-with-water-and-clouds-png-image_6746192.png'}
              alt={`${pet.name}'s photo`}

              onClick={() => {
                onClickHandler(pet.id)
              }}
            />
          </div>
        </div>
      ))}
    </>
  )
}

export default PetCards