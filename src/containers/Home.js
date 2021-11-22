import React, { useState, useEffect } from "react";
import Learn from "../components/Learn";
import Quiz from "../components/Quiz";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      currency
      emoji
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [allCountries, setAllCountries] = useState();
  const [currentPage, setCurrentPage] = useState("learn");

  useEffect(() => {
    if (data) {
      const { countries } = data;
      setAllCountries(countries);
    }
  }, [allCountries, data]);

  const changeTab = (page) => {
    setCurrentPage(page);
    console.log(page);
  };

  return (
    <>
      <header>
        <h1 style={{ textAlign: "center" }}>Countries Quiz</h1>
      </header>

      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <CircularProgress />
        </Box>
      )}
      <button onClick={() => changeTab("learn")}>LEARN</button>
      <button onClick={() => changeTab("quiz")}>QUIZ</button>

      {!loading && currentPage === "learn" && <Learn data={data} />}
      {!loading && currentPage === "quiz" && <Quiz data={data} />}
      {error && <p>Sorry there is currently no data available</p>}
    </>
  );
};

export default Home;
