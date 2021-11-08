import React, { useState, useEffect } from "react";

const Quiz = (data) => {
  const [allCountries, setAllCountries] = useState();
  const [currentCountry, setCurrentCountry] = useState();

  useEffect(() => {
    if (data) {
      const { countries } = data.data;
      setAllCountries(countries);
      let totalCountries = [...countries];
      let currentCountry =
        totalCountries[Math.floor(Math.random() * totalCountries.length)];
      let languages = currentCountry.languages.map((language) => {
        return language.name;
      });
      let renderedCountry = { ...currentCountry };
      renderedCountry.languagesAsString = languages.join(", ");
      setCurrentCountry(renderedCountry);
    }
  }, [allCountries]);

  console.log(currentCountry);

  return (
    <>
      <h2>QUIZ</h2>
      {allCountries && (
        <form action="/action">
          <p>What is the capital of {currentCountry.name}</p>
          <input type="text" id="country" name="country" required></input>
        </form>
      )}
    </>
  );
};

export default Quiz;
