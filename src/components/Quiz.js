import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Quiz = ({ data, changeTab }) => {
  const [allCountries, setAllCountries] = useState();
  const [currentCountry, setCurrentCountry] = useState();
  const [capital, setCapital] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    if (data) {
      const { countries } = data;
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

  const verifyAnswer = (value) => {
    let capital = value.toLowerCase();
    capital = capital.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // normalise string
    let currentCapital = currentCountry.capital.toLowerCase();
    currentCapital = currentCapital
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (currentCapital === capital) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
  };

  const resetCountry = () => {
    let currentCountry =
      allCountries[Math.floor(Math.random() * allCountries.length)];
    let languages = currentCountry.languages.map((language) => {
      return language.name;
    });
    let renderedCountry = { ...currentCountry };
    renderedCountry.languagesAsString = languages.join(", ");
    setCurrentCountry(renderedCountry);
    setCorrectAnswer(null); // remember to change
    setCapital("");
  };

  const handleSubmit = (event, boolean = false) => {
    event.preventDefault();
    boolean ? verifyAnswer(event.target[0].value) : verifyAnswer(capital);
  };

  return (
    <>
      {allCountries && (
        <form
          className="form"
          action="/action"
          onSubmit={(event) => handleSubmit(event, true)}
        >
          <p>What is the capital of {currentCountry.name}?</p>
          <input
            onInput={(event) => setCapital(event.target.value)}
            type="text"
            id="country"
            name="country"
            required
            value={capital}
          ></input>
          <Button
            onClick={(event) => {
              handleSubmit(event);
            }}
            variant="contained"
            color="primary"
          >
            <ArrowForwardIcon />
          </Button>
        </form>
      )}
      {correctAnswer && <p>Correct answer!</p>}
      {correctAnswer === false && <p>Sorry, wrong answer!</p>}

      <div className="button-holder">
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
      <Button
        variant="contained"
        className="page-button"
        onClick={() => changeTab()}
      >
        Learn
      </Button>
    </>
  );
};

export default Quiz;
