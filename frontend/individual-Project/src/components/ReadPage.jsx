import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReadPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const accToken = localStorage.getItem("access_token");

        const headers = {
          Authorization: `Bearer ${accToken}`,
        };

        const { data } = await axios.get(`http://localhost:3000/advice/${id}`, {
          headers,
        });
        console.log(data.data.Type);

        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleOnClick = () => {
    navigate("/home");
  };

  return (
    <>
      <section className=" flex flex-col items-center gap-3 py-24 text-[#860A35] ">
        <div className="rounded overflow-hidden shadow-lg w-3/5 bg-[#FFC5C5] h-96 ">
          <div className="px-6 py-4">
            <div className="font-bold text-4xl mb-2">{data?.data?.title}</div>
          </div>
          <div className="px-6 py-6">
            <div className="font-bold text-2xl mb-2">{data?.data?.advice}</div>
          </div>
          <div className="px-6 py-6">
            <div className="font-bold text-xl mb-2">
              based on: {data?.data?.Type?.type}
            </div>
          </div>
          <div className="flex justify-end px-6 ">
            <button
              className="inline-flex items-center justify-center px-4 py-2 
              text-base font-medium leading-6 text-[#FFC5C5] 
              whitespace-no-wrap bg-[#860A35]  rounded-md shadow-sm  
              focus:outline-none focus:shadow-none w-40"
              onClick={handleOnClick}
            >
              Back
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReadPage;
