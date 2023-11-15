import Navbar from "../components/Navbar"
import PetCards from "../components/PetsCards"

const LandingPage = () => {
  return (
    <>
      <div className="flex">
        <div id="card-box" className="mx-[2rem] my-[3rem] grid grid-cols-3 gap-7">
          <PetCards />
        </div>
      </div>
    </>
  )
}

export default LandingPage