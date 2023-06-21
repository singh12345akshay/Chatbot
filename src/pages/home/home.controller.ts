import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export interface Idata {
  _id: string;
  name: string;
}

export type apiResponse = Idata[];

export default function HomeController() {
  const [bot, setBot] = useState<apiResponse>([]);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const storedData = localStorage.getItem("authToken");

    if (storedData) {
      const authToken = JSON.parse(storedData);

      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(
          "https://chatbotapps.mindpath.tech/api/v1/user/bots",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = response.data.body;

        setBot(data);
        setLoading(false);
        localStorage.setItem("botList", JSON.stringify(data));
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    // function to fetch the data from the API
    fetchData();
  }, []);
  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchText(value);

    if (value.trim() === "") {
      setSearchResults(bot); // Reset search results to original data
    } else {
      const filteredResults = bot.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      console.log("filteredResults", filteredResults);
      setSearchResults(filteredResults);
    }
  };

  return {
    getters: { bot, loading, searchText, searchResults },
    handlers: {
      fetchData,
      handleSearch,
    },
  };
}
