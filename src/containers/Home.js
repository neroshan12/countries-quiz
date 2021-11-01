import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRIES = gql`
  query {
    countries {
      name
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  console.log(data);
  return (
    <>
      <h1>Countries Quiz</h1>
    </>
  );
};

export default Home;
