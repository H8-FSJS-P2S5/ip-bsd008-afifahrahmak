import { useNavigate } from "react-router-dom";

const Image = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/quotes");
  };

  return (
    <>
      <h1 className="text-3xl md:text-6xl font-bold text-center mt-5 text-[#FFC5C5] pt-10">
        Welcome To Pituah
      </h1>
      <div className="pb-36 border-b-2 md:pt-5"></div>
      <section className="colums-2 md:columns-4 gap-4 xl:w-[1200px] shado-xl bg- mx-auto sapce-y-3 mt-20">
        <div class="break-inside-avoid py-4 ">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/228x305/?quote"
          />
        </div>
        <div class="break-inside-avoid py-4">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/228x215/?quote"
          />
        </div>
        <div class="break-inside-avoid py-4">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/200x160/?quote"
          />
        </div>
        <div class="break-inside-avoid py-4">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/228x215/?quote"
          />
        </div>
        <div class="break-inside-avoid py-4">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/228x305/?quote"
          />
        </div>
        <div class="break-inside-avoid py-4">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/228x343/?quote"
          />
        </div>
        <div class="break-inside-avoid py-4">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/228x343/?quote"
          />
        </div>
        <div class="break-inside-avoid py-4">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/228x304/?quote"
          />
        </div>
        <div class="break-inside-avoid py-4">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/228x180/?quote"
          />
        </div>
        <div class="break-inside-avoid py-4">
          <img
            loading="lazy"
            width={300}
            height={300}
            className="rounded-xl hover:scale-105 tarnsition duration-200 ease-in-out"
            src="https://source.unsplash.com/random/228x180/?quote"
          />
        </div>
      </section>
      <h1 className="text-3xl md:text-6xl font-bold text-center mt-5 text-[#FFC5C5] pt-10   ">
        Read The Advice Below
      </h1>
      <p className="text-3xl md:text-6xl font-bold text-center mt-5 text-[#FFC5C5] pt-10   ">
        or
      </p>
      <p className="text-xl md:text-4xl font-bold text-center mt-5 text-[#FFC5C5] pt-10   ">
        You can read a quote,
        <button
          className="inline-flex items-center justify-center px-4 py-2 
              text-base font-medium leading-6 text-[#FFC5C5] 
              whitespace-no-wrap bg-[#860A35]  rounded-md shadow-sm  
              focus:outline-none focus:shadow-none"
          onClick={handleOnClick}
        >
          Quote !!
        </button>
      </p>

      <div className="pb-36  border-b-2 md:pt-20"></div>
    </>
  );
};

export default Image;
