import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
  }, [allCountries, data]);

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
      <h2>LEARN</h2>
      {currentCountry && (
        <div className="country-container">
          <h3>
            {currentCountry.emoji} {currentCountry.name.toUpperCase()}{" "}
            {currentCountry.emoji}
          </h3>
          <div className="content-container">
            {currentCountry.capital || "N/A"}
            <p className="keys">CAPITAL</p>
          </div>
          <div className="content-container">
            {currentCountry.currency || "N/A"}
            <p className="keys">CURRENCY</p>
          </div>
          <div className="content-container">
            {currentCountry.continent.name || "N/A"}
            <p className="keys">CONTINENT</p>
          </div>
          <div className="content-container">
            {currentCountry.languagesAsString || "N/A"}
            <p className="keys">LANGUAGE(S)</p>
          </div>

          <Button
            onClick={() => {
              resetCountry();
            }}
            variant="contained"
            color="primary"
          >
            NEXT <ArrowForwardIosIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Learn;
