import { useEffect, useState } from "react";
import { UseParam } from "./UseParam";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    const getdata = async () => {
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + UseParam.getToken(),
          },
        });
        if (response.status === 200) {
          let jsondata = await response.json();
          setData(jsondata);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getdata();
  }, []);

  return { data, error, isloading };
}
