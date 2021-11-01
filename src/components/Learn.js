import React, { useState, useEffect } from "react";

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
    <div>
      <h2>Learn</h2>
      {currentCountry && (
        <div>
          <p>
            Country: {currentCountry.name} {currentCountry.emoji}
          </p>
          <p>Capital: {currentCountry.capital}</p>
          <p>Currency: {currentCountry.currency}</p>
          <p>Continent: {currentCountry.continent.name}</p>
          <p>Languages: {currentCountry.languagesAsString}</p>
          <button
            onClick={() => {
              resetCountry();
            }}
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

export default Learn;
