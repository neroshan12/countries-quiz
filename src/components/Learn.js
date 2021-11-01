import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./learn.scss";

const Learn = (data) => {
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

  const resetCountry = () => {
    let currentCountry =
      allCountries[Math.floor(Math.random() * allCountries.length)];
    let languages = currentCountry.languages.map((language) => {
      return language.name;
    });
    let renderedCountry = { ...currentCountry };
    renderedCountry.languagesAsString = languages.join(", ");
    setCurrentCountry(renderedCountry);
  };

  return (
    <div className="learn">
      <h2>Learn</h2>
      {currentCountry && (
        <div className="country-container">
          <p>
            Country: {currentCountry.name} {currentCountry.emoji}
          </p>
          <p>Capital: {currentCountry.capital}</p>
          <p>Currency: {currentCountry.currency}</p>
          <p>Continent: {currentCountry.continent.name}</p>
          <p>Languages: {currentCountry.languagesAsString}</p>

          <Button
            onClick={() => {
              resetCountry();
            }}
            variant="contained"
            color="primary"
          >
            NEXT
          </Button>
        </div>
      )}
    </div>
  );
};

export default Learn;
