import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [api, setApi] = useState([]);
  const apiKey = `at_ORYrC6qERueYVjqw80pPsTJRqV4QM`;
  useEffect(() => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=8.8.8.8`
    )
      .then((response) => response.json())
      .then((data) => {
        setApi(data);
        console.log(data);
      })
      .catch((er) => console.error(er.message));
  }, []);
}

export default App;
