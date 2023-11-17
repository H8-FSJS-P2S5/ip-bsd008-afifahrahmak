
const ButtonLR = (props) => {
    const {buttonName} = props



    return (
        <>
        {/* Button Login dari Halaman Login */}
        <div className="mt-8 flex justify-center text-lg text-black">
            <button 
            type="submit" 
            className="rounded-3xl bg-black bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-red-700"
            >{buttonName}
            </button>
        </div>
        {/* end of Button Login dari Halaman Login */}        
        </>
    )
}

export default ButtonLR;