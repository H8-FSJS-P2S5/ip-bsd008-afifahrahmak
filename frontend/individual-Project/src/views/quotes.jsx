import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Quote = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const accToken = localStorage.getItem("access_token");

        const headers = {
          Authorization: `Bearer ${accToken}`,
        };
        console.log(headers);

        const { data } = await axios.get("http://localhost:3000/quote", {
          headers,
        });

        // console.log(data.data);
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleOnClick = (id) => {
    navigate(`/advice/${id}`);
  };
  return (
    <>
      <section className=" flex flex-col items-center gap-3 py-24 text-[#860A35] ">
        {data.map((el) => (
          <div className="rounded overflow-hidden shadow-lg w-3/5 bg-[#FFC5C5] ">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{el.q}</div>
              <div className="font-bold text-sm mb-2">by: {el.a}</div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Quote;
