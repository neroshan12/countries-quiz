import React, { useState, useEffect } from "react";
import Learn from "../components/Learn";
import Quiz from "../components/Quiz";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SchoolIcon from "@mui/icons-material/School";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Typography from "@mui/material/Typography";

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
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    if (data) {
      const { countries } = data;
      setAllCountries(countries);
    }
  }, [allCountries, data]);

  const changeTab = (page) => {
    setModalOpen(false);
    setCurrentPage(page);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    padding: 0,
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="modal-home"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-holder" sx={style}>
          <Button
            variant="contained"
            color="primary"
            className="cta-button"
            onClick={() => changeTab("learn")}
          >
            <div className="cta-holder">
              <p>
                LEARN
                <SchoolIcon />
              </p>
              <Typography
                variant="body2"
                id="modal-modal-description"
                sx={{ mt: 2 }}
                className="modal-text"
              >
                Here you can learn more about capital cities, currencies and
                languages of countries around the world...
              </Typography>
            </div>
          </Button>

          <Button
            variant="contained"
            color="primary"
            className="cta-button"
            onClick={() => changeTab("quiz")}
          >
            <div className="cta-holder">
              <p>
                QUIZ
                <QuestionAnswerIcon />
              </p>
              <Typography
                variant="body2"
                id="modal-modal-description"
                className="modal-text"
                sx={{ mt: 2 }}
              >
                Time to test your knowledge, are you ready?
              </Typography>
            </div>
          </Button>
        </Box>
      </Modal>

      <header>
        <h1 style={{ textAlign: "center" }}>Kvíz</h1>
      </header>

      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && currentPage === "learn" && <Learn data={data} />}
      {!loading && currentPage === "quiz" && <Quiz data={data} />}
      {error && <p>Sorry there is currently no data available</p>}
    </>
  );
};

export default Home;
