import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyCard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const accToken = localStorage.getItem("access_token");

        const headers = {
          Authorization: `Bearer ${accToken}`,
        };
        // console.log(headers);

        const { data } = await axios.get("http://localhost:3000/myAdvice", {
          headers,
        });

        setData(data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleDeleteOnClick = async (id) => {
    try {
      const accToken = localStorage.getItem("access_token");

      const headers = {
        Authorization: `Bearer ${accToken}`,
      };

      await axios.delete(`http://localhost:3000/advice/${id}`, {
        headers,
      });

      // console.log(headers);

      const { data } = await axios.get("http://localhost:3000/myAdvice", {
        headers,
      });

      setData(data);

      console.log("sukses delete data");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateOnClick = (id) => {
    navigate(`/updateAdvice/${id}`);
  };

  if (data.length === 0) {
    return (
      <>
        <section className=" flex flex-col items-center gap-3 py-24 text-[#860A35] ">
          <div className="rounded overflow-hidden shadow-lg w-3/5 bg-[#FFC5C5] h-96 ">
            <div className="px-6 py-4">
              <div className="font-bold text-6xl mb-2"></div>
            </div>
            <div className="px-6 py-6">
              <div className="font-bold text-2xl mb-2"></div>
            </div>
            <div className="px-6 py-6">
              <div className="font-bold text-xl mb-2"></div>
            </div>
            <div className="flex justify-end px-6 ">
              <button
                className="inline-flex items-center justify-center px-4 py-2 
              text-base font-medium leading-6 text-[#FFC5C5] 
              whitespace-no-wrap bg-[#860A35]  rounded-md shadow-sm  
              focus:outline-none focus:shadow-none w-40"
              >
                Back
              </button>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className=" flex flex-col items-center gap-3 py-24 text-[#860A35] ">
          {data?.data?.map((el) => (
            <div className="rounded overflow-hidden shadow-lg w-3/5 bg-[#FFC5C5] ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{el.title}</div>
              </div>
              <div className="px-6  pb-4">
                <div className="flex flex-row flex justify-end gap-4 ">
                  <button
                    className="inline-flex items-center justify-center px-4 py-2 
                text-base font-medium leading-6 text-[#FFC5C5] 
                whitespace-no-wrap bg-[#860A35]  rounded-md shadow-sm  
                focus:outline-none focus:shadow-none w-40"
                    onClick={() => handleUpdateOnClick(el.id)}
                  >
                    Update
                  </button>
                  <div className="flex ">
                    <button
                      className="inline-flex items-center justify-center px-4 py-2 
                text-base font-medium leading-6 text-[#FFC5C5] 
                whitespace-no-wrap bg-[#860A35]  rounded-md shadow-sm  
                focus:outline-none focus:shadow-none w-40 "
                      onClick={() => handleDeleteOnClick(el.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </>
    );
  }
};

export default MyCard;
