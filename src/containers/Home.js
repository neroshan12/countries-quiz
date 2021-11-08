import React, { useState } from "react";
import Learn from "../components/Learn";
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

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Countries Quiz</h1>
      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <CircularProgress />
        </Box>
      )}
      {!loading && <Learn data={data} />}
    </>
  );
};

export default Home;
