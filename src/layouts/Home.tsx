import React from "react";
import { Container } from "reactstrap";

import Task from "../containers/Task/views/Task";

const Home = () => {
  return (
    <Container className="home-container d-flex flex-column">
      <Task />
    </Container>
  );
};

export default Home;
